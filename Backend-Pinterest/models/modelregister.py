from sqlmodel import Field, SQLModel

class Logins(SQLModel, table=True):
    id_login: int | None = Field(default=None, primary_key=True)
    user: str
    password: str
    birthday: str

class CreaLogin(SQLModel):
    user: str
    password: str
    birthday: str