from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, desc
from typing import List
from app.database import get_session
from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.models.purchase import Purchase

router = APIRouter(prefix='/purchase', tags=['Purchase'])

@router.get('/history')
def get_purchase_history(session: Session = Depends(get_session)):
    statement = select(Purchase).where(Purchase.user_id == 1).order_by(desc(Purchase.date))
    purchases = session.exec(statement).all()

    history_detail = []

    for purchase in purchases:
        cart_statement = select(Cart).where(Cart.id == purchase.cart_id)
        cart = session.exec(cart_statement).first()
        
        items_detail = []
        subtotal_acumulado = 0.0
        tax_acumulado = 0.0

        if cart:
            item_statement = select(CartItem).where(CartItem.cart_id == cart.id)
            items = session.exec(item_statement).all()

            for item in items:
                product = session.get(Product, item.product_id)

                if product:
                    tax_rate = 0.10 if product.category.lower() == 'electrónica' else 0.21
                    item_subtotal = product.price * item.quantity
                    item_tax = item_subtotal * tax_rate
                    
                    subtotal_acumulado += item_subtotal
                    tax_acumulado += item_tax

                    items_detail.append({
                        'name': product.name,
                        'quantity': item.quantity,
                        'price': product.price,
                        'tax': round(item_tax, 2)
                    })

        history_detail.append({
            'id': purchase.id,
            'date': purchase.date,
            'total_amount': purchase.total_amount,
            'address': 'AV Central 4124', # Podrías guardarlo en el modelo Purchase después
            'card_last_digits': '1234',
            'items': items_detail,
            'subtotal': round(subtotal_acumulado, 2),
            'tax_total': round(tax_acumulado, 2),
            'shipping': 50.00 if purchase.total_amount < 1000 else 0.00
        })

    return history_detail

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