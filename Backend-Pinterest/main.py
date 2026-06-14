from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from db import create_all_tables
import os

os.makedirs("static/uploads/posts", exist_ok=True)
os.makedirs("static/uploads/avatars", exist_ok=True)

default_avatar_path = "static/uploads/perfil_default.png"
if not os.path.exists(default_avatar_path):
    with open(default_avatar_path, "wb") as f:
        f.write(b"")

from app.router import auth, users, posts, categories

pinterest = FastAPI(
    title="U|Gallery API",
    description="Backend para plataforma multimedia tipo Pinterest con soporte SQLite y AWS S3",
    version="1.0.0",
    lifespan=create_all_tables
)

pinterest.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pinterest.mount("/static", StaticFiles(directory="static"), name="static")

pinterest.include_router(auth.router)
pinterest.include_router(users.router)
pinterest.include_router(posts.router)
pinterest.include_router(categories.router)

@pinterest.get("/")
def read_root():
    return {
        "mensaje": "¡Servidor de U|Gallery activo y listo!",
        "documentacion": "http://localhost:8000/docs",
        "estado": "Online"
    }