from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from db import created_all_tables
from app.router import auth, users, posts, categories
import os

os.makedirs("static/uploads/posts", exist_ok=True)
os.makedirs("static/uploads/avatars", exist_ok=True)

default_avatar_path = "static/uploads/perfil_default.png"
if not os.path.exists(default_avatar_path):
    with open(default_avatar_path, "wb") as f:
        f.write(b"")

ugallery = FastAPI(lifespan=created_all_tables)

ugallery.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ugallery.mount("/static", StaticFiles(directory="static"), name="static")

ugallery.include_router(auth.router)
ugallery.include_router(users.router)
ugallery.include_router(posts.router)
ugallery.include_router(categories.router)
