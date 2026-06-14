from typing import Annotated
from fastapi import Depends, FastAPI
from sqlmodel import SQLModel, Session, create_engine, select
import os

db_name = "dbpinterest.sqlite3"
db_url = f"sqlite:///{db_name}"

engine = create_engine(db_url, connect_args={"check_same_thread": False})

from models import Usuario, Post, Like, Comment
from auth_utils import get_password_hash

def get_session():
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_session)]

def seed_database(session: Session):
    existing_users = session.exec(select(Usuario)).first()
    if existing_users:
        return

    admin_user = Usuario(
        correo="admin@ugallery.com",
        password_hash=get_password_hash("123456"),
        nombre="Nicolás Andrés Velasco Reyes",
        birthday="2000-01-01",
        bio="Estudiante de Ingeniería en Sistemas. Apasionado por la carrera, el desarrollo y el aprendizaje autónomo.",
        avatar_url=""
    )
    creative_user = Usuario(
        correo="creative@studio.com",
        password_hash=get_password_hash("123456"),
        nombre="Creative Studio",
        bio="Estudio creativo de diseño digital y fotografía.",
        avatar_url=""
    )
    juan_user = Usuario(
        correo="juan@gmail.com",
        password_hash=get_password_hash("123456"),
        nombre="Juan Báez",
        bio="Apasionado por la mecánica y los automóviles.",
        avatar_url=""
    )
    steven_user = Usuario(
        correo="steven@gmail.com",
        password_hash=get_password_hash("123456"),
        nombre="Steven Cazar",
        bio="Amante del arte abstracto y el desarrollo web.",
        avatar_url=""
    )

    session.add(admin_user)
    session.add(creative_user)
    session.add(juan_user)
    session.add(steven_user)
    session.commit()

    session.refresh(admin_user)
    session.refresh(creative_user)
    session.refresh(juan_user)
    session.refresh(steven_user)

    posts = [
        Post(
            titulo="Gradiente Abstracto 3D",
            descripcion="Una hermosa representación visual de colores fluidos y formas abstractas entrelazadas, perfecta para fondos de pantalla y diseño UI.",
            image_url="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000",
            user_id=creative_user.id_usuario
        ),
        Post(
            titulo="Fotografía de Montaña",
            descripcion="Espectacular vista de montañas nevadas bajo la luz del atardecer alpino.",
            image_url="https://images.pexels.com/photos/9329047/pexels-photo-9329047.jpeg?auto=compress&cs=tinysrgb&w=600",
            user_id=creative_user.id_usuario
        ),
        Post(
            titulo="Luces de la Ciudad",
            descripcion="Las luces de la gran ciudad brillando por la noche con técnica de larga exposición.",
            image_url="https://images.pexels.com/photos/9221307/pexels-photo-9221307.jpeg?auto=compress&cs=tinysrgb&w=600",
            user_id=creative_user.id_usuario
        ),
        Post(
            titulo="Naturaleza Verde",
            descripcion="Hojas verdes cubiertas de rocío de la mañana fresca.",
            image_url="https://images.pexels.com/photos/1666667/pexels-photo-1666667.jpeg?auto=compress&cs=tinysrgb&w=600",
            user_id=creative_user.id_usuario
        ),
        Post(
            titulo="Arquitectura Moderna",
            descripcion="Líneas limpias y diseño de cristal de un rascacielos urbano de última generación.",
            image_url="https://images.pexels.com/photos/36770103/pexels-photo-36770103.jpeg?auto=compress&cs=tinysrgb&w=600",
            user_id=creative_user.id_usuario
        ),
        Post(
            titulo="Retrato en la Playa",
            descripcion="Caminando por la costa dorada al amanecer.",
            image_url="https://images.pexels.com/photos/30150825/pexels-photo-30150825.jpeg?auto=compress&cs=tinysrgb&w=600",
            user_id=creative_user.id_usuario
        ),
        Post(
            titulo="Café por la Mañana",
            descripcion="El comienzo perfecto del día con un buen espresso y lectura inspiradora.",
            image_url="https://images.pexels.com/photos/35719467/pexels-photo-35719467.jpeg?auto=compress&cs=tinysrgb&w=600",
            user_id=creative_user.id_usuario
        ),
        Post(
            titulo="Carretera Costera",
            descripcion="Un viaje por carretera inolvidable al lado del inmenso océano azul.",
            image_url="https://images.pexels.com/photos/15988007/pexels-photo-15988007.jpeg?auto=compress&cs=tinysrgb&w=600",
            user_id=creative_user.id_usuario
        ),
        Post(
            titulo="Bosque de Niebla",
            descripcion="El misterio de un bosque de pinos bajo la densa niebla invernal.",
            image_url="https://images.pexels.com/photos/12379827/pexels-photo-12379827.jpeg?auto=compress&cs=tinysrgb&w=600",
            user_id=creative_user.id_usuario
        ),
        Post(
            titulo="Flores Silvestres",
            descripcion="La primavera ha llegado con una explosión de color silvestre en la pradera.",
            image_url="https://images.pexels.com/photos/3724836/pexels-photo-3724836.jpeg?auto=compress&cs=tinysrgb&w=600",
            user_id=creative_user.id_usuario
        )
    ]

    for post in posts:
        session.add(post)
    session.commit()

    first_post = session.exec(select(Post).where(Post.titulo == "Gradiente Abstracto 3D")).first()
    if first_post:
        comment1 = Comment(
            content="Buena imagen, pero que tal si publican como reparar un skoda que esta casi dañado?",
            user_id=juan_user.id_usuario,
            post_id=first_post.id_post
        )
        comment2 = Comment(
            content="Hola acá se puede poner omfg?",
            user_id=steven_user.id_usuario,
            post_id=first_post.id_post
        )
        session.add(comment1)
        session.add(comment2)
        
        like1 = Like(user_id=juan_user.id_usuario, post_id=first_post.id_post)
        like2 = Like(user_id=steven_user.id_usuario, post_id=first_post.id_post)
        session.add(like1)
        session.add(like2)
        
        session.commit()

def create_all_tables(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        seed_database(session)
    yield