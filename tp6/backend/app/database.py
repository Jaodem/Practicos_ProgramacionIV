from sqlmodel import create_engine, SQLModel, Session
import os

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