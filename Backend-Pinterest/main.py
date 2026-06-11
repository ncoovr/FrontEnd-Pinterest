from fastapi import FastAPI
from db import create_all_tables
from fastapi.middleware.cors import CORSMiddleware
from app.router import routerregister
from app.router import routerlogin

pinterest = FastAPI(lifespan=create_all_tables)

pinterest.add_middleware( CORSMiddleware, 
                   allow_origins=["*"], 
                   allow_credentials=True, 
                   allow_methods=["*"], 
                   allow_headers=["*"])

pinterest.include_router(routerregister.routerl)
pinterest.include_router(routerlogin.routerLogin)