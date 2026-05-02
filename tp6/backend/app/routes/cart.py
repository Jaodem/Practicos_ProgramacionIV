from webbrowser import get
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm.instrumentation import state
from sqlmodel import Session, select
from app.database import get_session
from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.models.purchase import Purchase

router = APIRouter(prefix='/cart', tags=['Cart'])

@router.post('/add/{product_id}')
def add_to_cart(product_id: int, quantity: int = 1, session: Session = Depends(get_session)):
    current_user_id = 1

    if not current_user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Debés iniciar sesión para realizar esta acción'
        )

    # Se buscar el producto y se valida el stock
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail='Producto no encontrado')

    # Se obtiene o se crea el acrrito activo para el usuario
    statement = select(Cart).where(Cart.user_id == current_user_id, Cart.status == 'active')
    cart = session.exec(statement).first()
    
    if not cart:
        cart = Cart(user_id=current_user_id)
        session.add(cart)
        session.commit()
        session.refresh(cart)

    if cart.id is None:
        raise HTTPException(status_code=500, detail='Error al crear el carrito')

    item_statement = select(CartItem).where(CartItem.cart_id == cart.id, CartItem.product_id == product_id)
    cart_item = session.exec(item_statement).first()
    
    already_in_cart = cart_item.quantity if cart_item else 0
    
    if product.stock < (already_in_cart + quantity):
        raise HTTPException(
            status_code=400, 
            detail=f"Stock insuficiente. Tenés {already_in_cart} en el carrito y el máximo es {product.stock}"
        )
    
    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity)
        session.add(cart_item)

    session.commit()
    return {'message': 'Producto agregado al carrito', 'cart_id': cart.id}

@router.get('/')
def get_cart(session: Session = Depends(get_session)):
    # Se busca el carrito activo para el usuario
    statement = select(Cart).where(Cart.user_id == 1, Cart.status == 'active')
    cart = session.exec(statement).first()
    
    if not cart:
        return {
            'items': [],
            'subtotal': 0,
            'tax': 0,
            'shipping': 0,
            'total': 0
        }

    items_detail = []
    subtotal_cart = 0.0
    total_tax = 0.0
    
    # Se obtienen los ítems del carrito
    item_statement = select(CartItem).where(CartItem.cart_id == cart.id)
    items = session.exec(item_statement).all()
    
    for item in items:
        product = session.get(Product, item.product_id)
        if product:
            # Se calcula el subtotal por producto
            item_subtotal = product.price * item.quantity
            subtotal_cart += item_subtotal
            
            # Se calcula el impuesto por producto
            tax_rate = 0.10 if product.category.lower() == 'electrónica' else 0.21
            total_tax += item_subtotal * tax_rate
            
            items_detail.append({
                'product_id': product.id,
                'name': product.name,
                'price': product.price,
                'quantity': item.quantity,
                'subtotal': round(item_subtotal, 2),
                'image_url': product.image_url
            })
        
    # Regla de envío: Gratis si el total supera 1000, sino $50
    shipping_const = 0 if subtotal_cart > 1000 else 50
    
    return {
        'cart_id': cart.id,
        'items': items_detail,
        'subtotal': round(subtotal_cart, 2),
        'tax': round(total_tax, 2),
        'shipping': shipping_const,
        'total': round(subtotal_cart + total_tax + shipping_const, 2)
    }

@router.post('/cancel')
def cancel_cart(session: Session = Depends(get_session)):
    # Se busca el carrito activo
    statement = select(Cart).where(Cart.user_id == 1, Cart.status =='active')
    cart = session.exec(statement).first()

    if not cart:
        raise HTTPException(status_code=404, detail='No hay carrito activo para cancelar')

    # Se eliminan los items del carrito
    item_statement = select(CartItem).where(CartItem.cart_id == cart.id)
    items = session.exec(item_statement).all()

    for item in items:
        session.delete(item)

    cart.status = 'cancelled'
    session.add(cart)
    session.commit()

    return {'message': 'Compra cancelada y carrito vaciado'}

@router.post('/checkout')
def checkout(session: Session = Depends(get_session)):
    # Se busca el carrito
    statement = select(Cart).where(Cart.user_id == 1, Cart.status == 'active')
    cart = session.exec(statement).first()

    if not cart or not session.exec(select(CartItem).where(CartItem.cart_id == cart.id)).first():
        raise HTTPException(status_code=400, detail='El carrito esta vacío')

    # Se calcula el total para el registro histórico
    total_compra = 0.0
    item_statement = select(CartItem).where(CartItem.cart_id == cart.id)
    items = session.exec(item_statement).all()

    if not items:
        raise HTTPException(status_code=400, detail='El carrito no tiene productos')

    for item in items:
        product = session.get(Product, item.product_id)
        if product:
            # Se actualiza el stock del producto
            product.stock -= item.quantity
            session.add(product)
            
            subtotal = product.price * item.quantity
            tax = 0.10 if product.category.lower() == 'electrónica' else 0.21
            total_compra += subtotal * (1 + tax)

    # Se suma el envío si corresponde
    if total_compra < 1000:
        total_compra += 50

    if cart.id is None:
        raise HTTPException(status_code=500, detail='Error de integridad en el carrito')

    # Se crea el registro de compra
    new_purchase = Purchase(
        user_id=1,
        cart_id=cart.id,
        total_amount=round(total_compra, 2)
    )
    session.add(new_purchase)

    cart.status = 'completed'
    session.add(cart)
    session.commit()

    return {'message': 'Compra finalizada con éxito. ¡Gracias por tu compra!'}

@router.get('/history')
def get_puchase_history(session: Session = Depends(get_session)):
    statement = select(Purchase).where(Purchase.user_id == 1)
    purchases = session.exec(statement).all()
    return purchases

@router.delete('/remove/{product_id}')
def remove_from_cart(product_id: int, session: Session = Depends(get_session)):
    # Se busca el carrito activo
    statement = select(Cart).where(Cart.user_id == 1, Cart.status == 'active')
    cart = session.exec(statement).first()

    if not cart:
        raise HTTPException(status_code=404, detail='No hay un carrito activo')

    # Se busca el ítem en el carrito
    item_statement = select(CartItem).where(CartItem.cart_id == cart.id, CartItem.product_id == product_id)
    cart_item = session.exec(item_statement).first()

    if not cart_item:
        raise HTTPException(status_code=404, detail='El producto no está en el carrito')

    # Si hay más de uno, se resta 1. Si hay uno solo, se borra
    if cart_item.quantity > 1:
        cart_item.quantity -= 1
        session.add(cart_item)
        msg = 'Cantidad actualizada'
    else:
        session.delete(cart_item)
        msg = 'Producto eliminado del carrito'

    session.commit()
    return {'message': msg}