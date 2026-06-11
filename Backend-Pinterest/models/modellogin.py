from sqlmodel import Field, SQLModel

class LoginRequest(SQLModel):
    correo: str
    password : str