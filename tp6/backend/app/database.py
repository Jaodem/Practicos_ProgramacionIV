from sqlmodel import create_engine, SQLModel, Session, select
import os
import json
from app.models.product import Product

sqlite_file_name = 'database.db'
sqlite_url = f'sqlite:///{sqlite_file_name}'

# El "engine" es el encargado de la comunicación con el archivo .db
# check_same_thread=False es necesario solo para SQLite en FastAPI
connect_args = {'check_same_thread': False}
engine = create_engine(sqlite_url, echo=True, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    
def get_session():
    with Session(engine) as session:
        yield session

def seed_products():
    with Session(engine) as session:
        # Se verifica si la tabla ya tiene datos
        if session.exec(select(Product)).first():
            return
        
        try:
            with open('data/productos.json', 'r', encoding='utf-8') as file:
                data = json.load(file)
                for item in data:
                    # Se mapea manualmente JSON (en espñol) -> Modelo (inglés)
                    product = Product(
                        id=item['id'],
                        name=item['titulo'],
                        price=item['precio'],
                        description=item['descripcion'],
                        category=item['categoria'],
                        stock=item['existencia'],
                        image_url=item['imagen']
                    )
                    session.add(product)
                session.commit()
                print('🌱 Datos iniciales cargados con éxito.')
        except Exception as e:
            session.rollback()
            print(f'❌ Error al cargar productos: {e}')
