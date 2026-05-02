'use client';

import { CartItemDetail } from '@/types/cart';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

export function CartItem({
  item
}: {
  item: CartItemDetail
  }) {
  const { addToCart, removeFromCart, loading } = useCart();

  return (
    <div className='flex items-center gap-4 py-4 border-b'>
      <div className='w-16 h-16 bg-gray-100 rounded shrink-0'>
        <img
          src={`http://localhost:8000/static/${item.image_url?.replace('imagenes/', 'images/')}`}
          alt={item.name}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='flex-1 min-w-0'>
        <h4 className='text-sm font-medium truncate'>
          {item.name}
        </h4>
        <p className='text-xs text-muted-foreground'>
          ${item.price} c/u
        </p>

        <div className='flex items-center gap-2 mt-2'>
          <Button
            variant='outline'
            size='icon'
            className='h-6 w-6'
            disabled={loading}
            onClick={() => removeFromCart(item.product_id)}
          >
            <Minus className='h-3 w-3' />
          </Button>
          <span className='text-sm'>
            Cantidad: {item.quantity}
          </span>
          <Button
            variant='outline'
            size='icon'
            className='h6- w-6'
            disabled={loading}
            onClick={() => addToCart(item.product_id, 1)}
          >
            <Plus className='h-3 w-3' />
          </Button>
        </div>
      </div>

      <div className='text-sm font-semibold'>
        ${item.subtotal}
      </div>
    </div>
  );
}