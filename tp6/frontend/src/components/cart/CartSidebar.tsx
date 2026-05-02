'use client';

import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CartItem } from './CartItem';
import { useAuth } from '@/context/AuthContext';

export function CartSidebar() {
  const { cart, loading } = useCart();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <Card>
        <CardContent className='pt-6'>
          <p className='text-sm text-muted-foreground text-center'>
            Iniciá sesión para ver y editar tu carrito
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='sticky top-4'>
      <CardHeader>
        <CardTitle className='text-lg'>
          Tu Carrito
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4 max-h-100 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 pr-2'>
        {cart?.items.length === 0 ? (
          <p className='text-sm text-center py-10 text-muted-foreground'>
            El carrito está vacío
          </p>
        ) : (
          cart?.items.map((item) => (
            <CartItem
              key={item.product_id}
              item={item}
            />
          ))
        )}
      </CardContent>

      {cart && cart.items.length > 0 && (
        <CardFooter className='flex-col border-t pt-4 gap-2'>
          <div className='flex justify-between w-full text-sm'>
            <span>Subtotal</span>
            <span>${cart.subtotal}</span>
          </div>
          <div className='flex justify-between w-full text-sm'>
            <span>IVA</span>
            <span>${cart.tax}</span>
          </div>
          <div className='flex justify-between w-full text-sm'>
            <span>Envío</span>
            <span>${cart.shipping}</span>
          </div>
          <div className='flex justify-between w-full font-bold text-lg mt-2'>
            <span>Total</span>
            <span>${cart.total}</span>
          </div>
          <Button className='w-full mt-4 cursor-pointer' size='lg'>
            Continuar la compra
          </Button>
          <Button variant='ghost' className='w-full text-xs text-muted-foreground cursor-pointer'>
            Cancelar
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}