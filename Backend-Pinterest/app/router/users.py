from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlmodel import select
from models.modelsall import Usuario, UserResponse, ProfileEdit
from db import SessionDep
from auth_utils import get_current_user_id
import boto3
import os
import uuid
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/users", tags=["Usuarios"])

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

@router.get("/me", response_model=UserResponse)
def get_me(session: SessionDep, current_user_id: int = Depends(get_current_user_id)):
    user = session.get(Usuario, current_user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@router.put("/me", response_model=UserResponse)
def update_profile(
    profile_data: ProfileEdit,
    session: SessionDep,
    current_user_id: int = Depends(get_current_user_id)
):
    user = session.get(Usuario, current_user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    if profile_data.nombre is not None:
        user.nombre = profile_data.nombre
    if profile_data.bio is not None:
        user.bio = profile_data.bio
        
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@router.post("/me/avatar")
async def upload_avatar(
    session: SessionDep,
    file: UploadFile = File(...),
    current_user_id: int = Depends(get_current_user_id)
):
    user = session.get(Usuario, current_user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in [".jpg", ".jpeg", ".png", ".webp", ".gif"]:
        raise HTTPException(status_code=400, detail="Tipo de archivo no permitido")
        
    unique_filename = f"avatars/{uuid.uuid4()}{file_ext}"
    avatar_url = ""
    
    if s3_client:
        try:
            s3_client.upload_fileobj(
                file.file,
                AWS_STORAGE_BUCKET_NAME,
                unique_filename,
                ExtraArgs={"ContentType": file.content_type}
            )
            avatar_url = f"https://{AWS_STORAGE_BUCKET_NAME}.s3.{AWS_S3_REGION}.amazonaws.com/{unique_filename}"
            print(f"[AWS S3] Avatar subido con éxito: {avatar_url}")
        except Exception as e:
            print(f"[AWS S3 ERROR] Falló la subida a S3: {str(e)}")
            avatar_url = save_avatar_locally(file, unique_filename)
    else:
        avatar_url = save_avatar_locally(file, unique_filename)
        
    user.avatar_url = avatar_url
    session.add(user)
    session.commit()
    session.refresh(user)
    
    return {"success": True, "avatar_url": avatar_url}

def save_avatar_locally(file, unique_filename) -> str:
    upload_dir = os.path.join("static", "uploads", "avatars")
    os.makedirs(upload_dir, exist_ok=True)
    
    local_filename = os.path.basename(unique_filename)
    file_path = os.path.join(upload_dir, local_filename)
    
    with open(file_path, "wb") as f:
        f.write(file.file.read())
        
    return f"http://localhost:8000/static/uploads/avatars/{local_filename}"
