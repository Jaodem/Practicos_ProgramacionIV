from fastapi import FastAPI
from app.database import create_db_and_tables
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Esto de ejecuta al iniciar la aplicación
    create_db_and_tables()
    yield
    # Esto de ejecuta al cerrar la aplicación
    pass

app = FastAPI(
    title='TP6 E-commerce API',
    version='0.1.0',
    lifespan=lifespan
)

@app.get('/', tags=['Root'])
def read_root():
    return {"message": "Bienvenido a la API del TP6 - Programacion IV"}