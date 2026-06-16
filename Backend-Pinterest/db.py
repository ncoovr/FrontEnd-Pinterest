from typing import Annotated
from fastapi import Depends, FastAPI
from sqlmodel import SQLModel, Session, create_engine, select

from test import seed_database

db_name = "dbUgallery.sqlite3"
db_url = f"sqlite:///{db_name}"

engine = create_engine(db_url)

#def created_all_tables(app: FastAPI):
#    SQLModel.metadata.create_all(engine)
#    yield

def created_all_tables(app: FastAPI):
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        seed_database(session)
    yield

def get_session():
    with Session(engine) as session:
        yield session

SessionDep =  Annotated[Session,Depends(get_session)]


