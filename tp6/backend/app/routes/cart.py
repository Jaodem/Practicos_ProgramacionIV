from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import get_session
from app.models.cart import Cart, CartItem
from app.models.product import Product

router = APIRouter(prefix='/cart', tags=['Cart'])

@router.post('/add/{product_id}')
def add_to_cart(product_id: int, quantity: int = 1, session: Session = Depends(get_session)):
    # Se buscar el producto y se valida el stock
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail='Producto no encontrado')
    if product.stock < quantity:
        raise HTTPException(status_code=400, detail='Stock insuficiente')

    if product.stock < quantity:
        raise HTTPException(status_code=400, detail='Stock insuficiente')

    # Se obtiene o se crea el acrrito activo para el usuario
    statement = select(Cart).where(Cart.user_id == 1, Cart.status == 'active')
    cart = session.exec(statement).first()
    
    if not cart:
        cart = Cart(user_id=1)
        session.add(cart)
        session.commit()
        session.refresh(cart)

    if cart.id is None:
        raise HTTPException(status_code=500, detail='Error al crear el carrito')

    item_statement = select(CartItem).where(CartItem.cart_id == cart.id, CartItem.product_id == product_id)
    cart_item = session.exec(item_statement).first()
    
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity)
        session.add(cart_item)

    session.commit()
    return {'message': 'Producto agregado al carrito', 'cart_id': cart.id}