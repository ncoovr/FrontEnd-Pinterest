from fastapi import FastAPI
from db import create_all_tables
from fastapi.middleware.cors import CORSMiddleware
from app.router import routerregister

pinterest = FastAPI(lifespan=create_all_tables)

pinterest.add_middleware( CORSMiddleware, 
                   allow_origins=["http://127.0.0.1:5500"], 
                   allow_credentials=True, 
                   allow_methods=["*"], 
                   allow_headers=["*"])

pinterest.include_router(routerregister.routerl)