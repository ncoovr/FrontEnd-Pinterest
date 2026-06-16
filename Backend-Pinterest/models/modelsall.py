from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, SQLModel
from pydantic import BaseModel

class Usuario(SQLModel, table=True):
    id_usuario: Optional[int] = Field(default=None, primary_key=True)
    correo: str = Field(unique=True, index=True)
    password_hash: str
    nombre: Optional[str] = Field(default=None)
    birthday: Optional[str] = Field(default=None)
    bio: Optional[str] = Field(default=None)
    avatar_url: Optional[str] = Field(default=None)

class Post(SQLModel, table=True):
    id_post: Optional[int] = Field(default=None, primary_key=True)
    titulo: str
    descripcion: Optional[str] = Field(default=None)
    image_url: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: int = Field(foreign_key="usuario.id_usuario")

class Like(SQLModel, table=True):
    user_id: int = Field(primary_key=True, foreign_key="usuario.id_usuario")
    post_id: int = Field(primary_key=True, foreign_key="post.id_post")

class Comment(SQLModel, table=True):
    id_comment: Optional[int] = Field(default=None, primary_key=True)
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: int = Field(foreign_key="usuario.id_usuario")
    post_id: int = Field(foreign_key="post.id_post")

class UserRegister(BaseModel):
    correo: str
    password: str
    fechaNacimiento: Optional[str] = None
    nombre: Optional[str] = None

class UserLogin(BaseModel):
    correo: str
    password: str

class TokenResponse(BaseModel):
    success: bool
    token: str
    mensaje: Optional[str] = None

class UserResponse(BaseModel):
    id_usuario: int
    correo: str
    nombre: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
    birthday: Optional[str] = None

class ProfileEdit(BaseModel):
    nombre: Optional[str] = None
    bio: Optional[str] = None

class CommentCreate(BaseModel):
    content: str

class CommentResponse(BaseModel):
    id_comment: int
    content: str
    created_at: datetime
    user_id: int
    post_id: int
    usuario_nombre: Optional[str] = None
    usuario_avatar: Optional[str] = None

class PostResponse(BaseModel):
    id_post: int
    titulo: str
    descripcion: Optional[str] = None
    image_url: str
    created_at: datetime
    user_id: int
    autor_nombre: Optional[str] = None
    autor_avatar: Optional[str] = None
    likes_count: int
    liked_by_me: bool
    comments: List[CommentResponse] = []

class CategoryResponse(BaseModel):
    id: int
    name: str
