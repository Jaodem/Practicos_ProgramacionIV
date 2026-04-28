from sqlalchemy.sql.expression import table
from sqlmodel import SQLModel, Field
from typing import Optional

# Clase base para los usuarios
class UserBase(SQLModel):
    name: str
    email: str = Field(unique=True, index=True)

# Modelo para la base de datos
class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str

# Esquema para la creación de usuarios
class UserCreate(UserBase):
    password: str
    
class UserLogin(SQLModel):
    email: str
    password: str