from optparse import Option
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, or_, col
from typing import List, Optional
from app.database import get_session
from app.models.product import Product

router = APIRouter(prefix='/products', tags=['Products'])

@router.get('/', response_model=List[Product])
def get_products(
    search: Optional[str] = None,
    category: Optional[str] = None,
    session: Session = Depends(get_session)
):
    statement = select(Product)
    
    if category:
        statement = statement.where(Product.category == category)
    
    if search:
        statement = statement.where(
            or_(
                col(Product.name).contains(search),
                col(Product.description).contains(search)
            )
        )
    
    products = session.exec(statement).all()
    return products

@router.get('/{product_id}', response_model=Product)
def get_product(product_id: int, session: Session = Depends(get_session)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail='Producto no encontrado')
    return product