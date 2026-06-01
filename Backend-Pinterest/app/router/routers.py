
from fastapi import APIRouter


router = APIRouter(prefix="/hola")

@router.get("/")
def hola():
    return{"Hello","World"}