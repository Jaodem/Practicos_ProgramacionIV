from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class CartItem(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    cart_id: int = Field(foreign_key='cart.id')
    product_id: int = Field(foreign_key='product.id')
    quantity: int

class Cart(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key='user.id')
    status: str = Field(default='active')