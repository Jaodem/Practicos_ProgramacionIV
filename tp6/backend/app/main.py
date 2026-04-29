from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.database import create_db_and_tables
from contextlib import asynccontextmanager
from app.routes import auth, product, cart

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Esto de ejecuta al iniciar la aplicación
    create_db_and_tables()
    from app.database import seed_products
    seed_products()    
    yield
    # Esto de ejecuta al cerrar la aplicación
    pass

app = FastAPI(
    title='TP6 E-commerce API',
    version='0.1.0',
    lifespan=lifespan
)

app.mount('/static', StaticFiles(directory='static'), name='static')
app.include_router(auth.router)
app.include_router(product.router)
app.include_router(cart.router)

@app.get('/', tags=['Root'])
def read_root():
    return {"message": "Bienvenido a la API del TP6 - Programacion IV"}