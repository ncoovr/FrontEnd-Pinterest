from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from sqlmodel import select, col
from models.modelsall import Post, Usuario, Like, Comment, PostResponse, CommentResponse, CommentCreate
from db import SessionDep
from auth_utils import get_current_user_id, get_optional_user_id, SECRET_KEY, ALGORITHM
import jwt
from typing import List, Optional
import boto3
import os
import uuid
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/posts", tags=["Publicaciones / Galería"])

AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION = os.getenv("AWS_S3_REGION", "us-east-1")

s3_client = None
if AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY and AWS_STORAGE_BUCKET_NAME:
    s3_client = boto3.client(
        "s3",
        aws_access_key_id=AWS_ACCESS_KEY_ID,
        aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
        region_name=AWS_S3_REGION
    )

@router.get("", response_model=List[PostResponse])
def get_posts(
    session: SessionDep,
    q: Optional[str] = Query(None, description="Buscar por título o descripción"),
    user_id: Optional[int] = Query(None, description="Filtrar por ID de usuario creador"),
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    current_user_id: Optional[int] = Depends(get_optional_user_id)
):
    query = select(Post)
    
    if q:
        query = query.where(
            (col(Post.titulo).ilike(f"%{q}%")) | (col(Post.descripcion).ilike(f"%{q}%"))
        )
    if user_id:
        query = query.where(Post.user_id == user_id)
        
    query = query.order_by(Post.created_at.desc()).offset(offset).limit(limit)
    posts = session.exec(query).all()
    
    response = []
    for post in posts:
        creator = session.get(Usuario, post.user_id)
        creator_name = creator.nombre if creator else "Usuario Desconocido"
        creator_avatar = creator.avatar_url if creator else ""
        
        likes_count = len(session.exec(select(Like).where(Like.post_id == post.id_post)).all())
        
        liked_by_me = False
        if current_user_id:
            liked_by = session.exec(
                select(Like).where(Like.post_id == post.id_post, Like.user_id == current_user_id)
            ).first()
            liked_by_me = liked_by is not None
            
        response.append(
            PostResponse(
                id_post=post.id_post,
                titulo=post.titulo,
                descripcion=post.descripcion,
                image_url=post.image_url,
                created_at=post.created_at,
                user_id=post.user_id,
                autor_nombre=creator_name,
                autor_avatar=creator_avatar,
                likes_count=likes_count,
                liked_by_me=liked_by_me,
                comments=[]
            )
        )
        
    return response

@router.get("/{post_id}", response_model=PostResponse)
def get_post_detail(
    post_id: int,
    session: SessionDep,
    current_user_id: Optional[int] = Depends(get_optional_user_id)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
        
    creator = session.get(Usuario, post.user_id)
    creator_name = creator.nombre if creator else "Usuario Desconocido"
    creator_avatar = creator.avatar_url if creator else ""
    
    likes_count = len(session.exec(select(Like).where(Like.post_id == post.id_post)).all())
    
    liked_by_me = False
    if current_user_id:
        liked_by = session.exec(
            select(Like).where(Like.post_id == post.id_post, Like.user_id == current_user_id)
        ).first()
        liked_by_me = liked_by is not None
        
    comments_query = select(Comment).where(Comment.post_id == post.id_post).order_by(Comment.created_at.asc())
    comments = session.exec(comments_query).all()
    
    comments_response = []
    for c in comments:
        comment_user = session.get(Usuario, c.user_id)
        comments_response.append(
            CommentResponse(
                id_comment=c.id_comment,
                content=c.content,
                created_at=c.created_at,
                user_id=c.user_id,
                post_id=c.post_id,
                usuario_nombre=comment_user.nombre if comment_user else "Usuario",
                usuario_avatar=comment_user.avatar_url if comment_user else ""
            )
        )
        
    return PostResponse(
        id_post=post.id_post,
        titulo=post.titulo,
        descripcion=post.descripcion,
        image_url=post.image_url,
        created_at=post.created_at,
        user_id=post.user_id,
        autor_nombre=creator_name,
        autor_avatar=creator_avatar,
        likes_count=likes_count,
        liked_by_me=liked_by_me,
        comments=comments_response
    )

@router.post("", response_model=PostResponse)
async def create_post(
    session: SessionDep,
    titulo: str = Form(...),
    descripcion: Optional[str] = Form(None),
    file: UploadFile = File(...),
    current_user_id: int = Depends(get_current_user_id)
):
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in [".jpg", ".jpeg", ".png", ".webp", ".gif"]:
        raise HTTPException(status_code=400, detail="Formato de imagen no permitido")
        
    unique_filename = f"posts/{uuid.uuid4()}{file_ext}"
    image_url = ""
    
    if s3_client:
        try:
            s3_client.upload_fileobj(
                file.file,
                AWS_STORAGE_BUCKET_NAME,
                unique_filename,
                ExtraArgs={"ContentType": file.content_type}
            )
            image_url = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_S3_REGION}.amazonaws.com/{unique_filename}"
            print(f"[AWS S3] Imagen subida con éxito: {image_url}")
        except Exception as e:
            print(f"[AWS S3 ERROR] Falló la subida a S3: {str(e)}")
            image_url = save_file_locally(file, unique_filename)
    else:
        image_url = save_file_locally(file, unique_filename)
        
    nuevo_post = Post(
        titulo=titulo,
        descripcion=descripcion,
        image_url=image_url,
        user_id=current_user_id
    )
    
    session.add(nuevo_post)
    session.commit()
    session.refresh(nuevo_post)
    
    creator = session.get(Usuario, current_user_id)
    
    return PostResponse(
        id_post=nuevo_post.id_post,
        titulo=nuevo_post.titulo,
        descripcion=nuevo_post.descripcion,
        image_url=nuevo_post.image_url,
        created_at=nuevo_post.created_at,
        user_id=nuevo_post.user_id,
        autor_nombre=creator.nombre if creator else "Yo",
        autor_avatar=creator.avatar_url if creator else "",
        likes_count=0,
        liked_by_me=False,
        comments=[]
    )

@router.post("/{post_id}/like")
def toggle_like(
    post_id: int,
    session: SessionDep,
    current_user_id: int = Depends(get_current_user_id)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
        
    existing_like = session.exec(
        select(Like).where(Like.post_id == post_id, Like.user_id == current_user_id)
    ).first()
    
    liked = False
    if existing_like:
        session.delete(existing_like)
        session.commit()
    else:
        nuevo_like = Like(user_id=current_user_id, post_id=post_id)
        session.add(nuevo_like)
        session.commit()
        liked = True
        
    likes_count = len(session.exec(select(Like).where(Like.post_id == post_id)).all())
    
    return {
        "success": True,
        "liked": liked,
        "likes_count": likes_count
    }

@router.post("/{post_id}/comments", response_model=CommentResponse)
def add_comment(
    post_id: int,
    comment_data: CommentCreate,
    session: SessionDep,
    current_user_id: int = Depends(get_current_user_id)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
        
    nuevo_comentario = Comment(
        content=comment_data.content,
        user_id=current_user_id,
        post_id=post_id
    )
    
    session.add(nuevo_comentario)
    session.commit()
    session.refresh(nuevo_comentario)
    
    comment_user = session.get(Usuario, current_user_id)
    
    return CommentResponse(
        id_comment=nuevo_comentario.id_comment,
        content=nuevo_comentario.content,
        created_at=nuevo_comentario.created_at,
        user_id=nuevo_comentario.user_id,
        post_id=nuevo_comentario.post_id,
        usuario_nombre=comment_user.nombre if comment_user else "Yo",
        usuario_avatar=comment_user.avatar_url if comment_user else ""
    )

@router.delete("/{post_id}")
def delete_post(
    post_id: int,
    session: SessionDep,
    current_user_id: int = Depends(get_current_user_id)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Publicación no encontrada")
        
    if post.user_id != current_user_id:
        raise HTTPException(status_code=403, detail="No tienes permisos para eliminar esta publicación")
        
    likes_to_delete = session.exec(select(Like).where(Like.post_id == post_id)).all()
    for l in likes_to_delete:
        session.delete(l)
        
    comments_to_delete = session.exec(select(Comment).where(Comment.post_id == post_id)).all()
    for c in comments_to_delete:
        session.delete(c)
        
    session.delete(post)
    session.commit()
    
    return {
        "success": True,
        "mensaje": "Publicación eliminada exitosamente"
    }

def save_file_locally(file, unique_filename) -> str:
    upload_dir = os.path.join("static", "uploads", "posts")
    os.makedirs(upload_dir, exist_ok=True)
    
    local_filename = os.path.basename(unique_filename)
    file_path = os.path.join(upload_dir, local_filename)
    
    with open(file_path, "wb") as f:
        f.write(file.file.read())
        
    return f"http://localhost:8000/static/uploads/posts/{local_filename}"
