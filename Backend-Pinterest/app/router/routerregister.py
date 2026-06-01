from fastapi import APIRouter, HTTPException
from sqlmodel import select
from models.modelregister import Logins, CreaLogin
from db import SessionDep

routerl = APIRouter(prefix="/register")

@routerl.post("/")
def crear_register(register_data: CreaLogin, session: SessionDep):
    usuario_existente = session.exec(select(Logins).where(Logins.user == register_data.user)).first()
    if usuario_existente:
        raise HTTPException(status_code=400, detail="El nombre de usuario ya está en uso")
    nuevo_usuario = Logins(
        user=register_data.user,
        password=register_data.password, 
        birthday=register_data.birthday
    )
    session.add(nuevo_usuario)
    session.commit()
    session.refresh(nuevo_usuario)
    return {"mensaje": "Usuario registrado exitosamente", "usuario": nuevo_usuario}