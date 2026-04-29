from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class Purchase(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key='user.id')
    cart_id: int = Field(foreign_key='cart.id')
    total_amount: float
    date: datetime = Field(default_factory=datetime.now)