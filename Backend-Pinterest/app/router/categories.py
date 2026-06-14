from fastapi import APIRouter
from typing import List
from models import CategoryResponse

router = APIRouter(prefix="/api/categories", tags=["Categorías"])

@router.get("", response_model=List[CategoryResponse])
def get_categories():
    return [
        {"id": 1, "name": "Todos"},
        {"id": 2, "name": "Diseño 3D"},
        {"id": 3, "name": "Naturaleza"},
        {"id": 4, "name": "Arquitectura"},
        {"id": 5, "name": "Fotografía"},
        {"id": 6, "name": "Café & Comida"},
        {"id": 7, "name": "Viajes"}
    ]
