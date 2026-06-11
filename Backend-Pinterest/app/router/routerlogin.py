from fastapi import APIRouter
from models.modellogin import LoginRequest

routerLogin = APIRouter(prefix="/login")

@routerLogin.post("/")
def login(loginData: LoginRequest):
    mensaje = {
        "success": True,
        "mensaje": "Login correcto"
    }
    return mensaje