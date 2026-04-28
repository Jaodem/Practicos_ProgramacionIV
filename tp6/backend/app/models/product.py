from sqlmodel import SQLModel, Field
from typing import Optional

class ProductBase(SQLModel):
    name: str
    description: str
    price: float
    category: str
    stock: int

class Product(ProductBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class ProductCreate(ProductBase):
    pass