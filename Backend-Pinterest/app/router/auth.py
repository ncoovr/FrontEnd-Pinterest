from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select
from models import Usuario, UserRegister, UserLogin, TokenResponse
from db import SessionDep
from auth_utils import get_password_hash, verify_password, create_access_token

router = APIRouter(tags=["Autenticación"])

@router.post("/api/auth/register")
@router.post("/registro/")
def register(register_data: UserRegister, session: SessionDep):
    existing_user = session.exec(
        select(Usuario).where(Usuario.correo == register_data.correo)
    ).first()
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="El correo electrónico ya está en uso"
        )
    
    nuevo_usuario = Usuario(
        correo=register_data.correo,
        password_hash=get_password_hash(register_data.password),
        nombre=register_data.nombre if register_data.nombre else register_data.correo.split("@")[0].capitalize(),
        birthday=register_data.fechaNacimiento,
        bio="¡Hola! Estoy usando U|Gallery.",
        avatar_url=""
    )
    
    session.add(nuevo_usuario)
    session.commit()
    session.refresh(nuevo_usuario)
    
    return {
        "success": True,
        "mensaje": "Usuario registrado exitosamente",
        "usuario": {
            "id_usuario": nuevo_usuario.id_usuario,
            "correo": nuevo_usuario.correo,
            "nombre": nuevo_usuario.nombre
        }
    }

@router.post("/api/auth/login")
@router.post("/login/")
def login(login_data: UserLogin, session: SessionDep):
    user = session.exec(
        select(Usuario).where(Usuario.correo == login_data.correo)
    ).first()
    
    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas"
        )
    
    access_token = create_access_token(data={"user_id": user.id_usuario, "correo": user.correo})
    
    return {
        "success": True,
        "token": access_token,
        "mensaje": "Inicio de sesión exitoso"
    }
