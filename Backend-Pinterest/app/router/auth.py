from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import select
from models.modelsall import Usuario, UserRegister, UserLogin, TokenResponse
from db import SessionDep
from auth_utils import get_password_hash, verify_password, create_access_token
from ad_utils import crear_usuario_ad, verificar_login_ad
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
    
    if register_data.nombre:
        nombre_usuario = register_data.nombre 
    else:
        nombre_usuario = register_data.correo.split("@")[0].capitalize()
    
    ad_creado = crear_usuario_ad(
        correo=register_data.correo,
        nombre=nombre_usuario,
        password=register_data.password
    )

    if not ad_creado:
        raise HTTPException(status_code=400, detail="No se puede crear en Active Directory")

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
    ad_autenticado = verificar_login_ad(correo=login_data.correo, password=login_data.password)
    
    if not ad_autenticado:
        raise HTTPException(
            status_code=401,
            detail="Credenciales incorrectas de Active Directory"
        )

    user = session.exec(
        select(Usuario).where(Usuario.correo == login_data.correo)
    ).first()
    
    if not user:
        user = Usuario(
            correo=login_data.correo,
            password_hash=get_password_hash(login_data.password),
            nombre=login_data.correo.split("@")[0].capitalize(),
            bio="¡Hola! Sincronizado desde Active Directory.",
            avatar_url=""
        )
        session.add(user)
        session.commit()
        session.refresh(user)
    
    access_token = create_access_token(data={"user_id": user.id_usuario, "correo": user.correo})
    
    return {
        "success": True,
        "token": access_token,
        "mensaje": "Inicio de sesión correcto vía Active Directory"
    }