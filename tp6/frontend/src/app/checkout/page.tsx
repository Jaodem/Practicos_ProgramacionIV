'use client';

import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { cart, confirmCheckout, loading } = useCart();
  const router = useRouter();
  const [shippingData, setShippingData] = useState({ address: '', card: '' });

  const handleFinalize = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página recargue
        
    try {
      await confirmCheckout();
      // El Toaster de éxito sale desde el Context, 
      // pero esperamos 3 segundos para que el usuario lo vea
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      // El error ya lo maneja el toast en el context
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className='container mx-auto py-20 text-center'>
        <h2 className='text-2xl font-bold'>
          No hay productos en el carrito
        </h2>
        <Button onClick={() => router.push('/')} className='mt-4 cursor-pointer'>
            Volver a la tienda
        </Button>
      </div>
    );
  }
  
  return (
    <div className='container mx-auto py-10 px-4 max-w-6xl'> {/* Centrado con max-width */}
      <h1 className='text-3xl font-bold mb-8 text-left'>
        Finalizar compra
      </h1>
      
      <form onSubmit={handleFinalize} className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Columna Izquierda: Resumen (Más grande: col-span-2) */}
        <Card className='md:col-span-2 shadow-sm border-gray-200'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              Resumen del carrito
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6 pb-6'>
            {cart.items.map((item) => (
              <div key={item.product_id} className='flex justify-between items-start border-b border-gray-100 pb-4'>
                <div className='space-y-1'>
                  <p className='font-bold text-lg'>{
                    item.name}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    Cantidad: {item.quantity}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-bold text-lg'>
                    ${item.subtotal.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            
            <div className='pt-4 space-y-2 text-base'>
              <div className='flex justify-between italic text-muted-foreground'>
                <span>Total productos:</span> <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between italic text-muted-foreground'>
                <span>IVA:</span> <span>${cart.tax.toFixed(2)}</span>
              </div>
              <div className='flex justify-between italic text-muted-foreground'>
                <span>Envío:</span> <span>${cart.shipping.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-3xl font-bold pt-4 border-t border-gray-200 mt-4'>
                <span>Total a pagar:</span> <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Columna Derecha: Datos de envío */}
        <Card className='h-fit shadow-sm border-gray-200'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              Datos de envío
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4 pb-6'>
            <div className='space-y-2'>
              <Label htmlFor='address' className='font-bold'>
                Dirección
              </Label>
              <Input 
                id='address' 
                placeholder='Ingresá tu dirección' 
                className='bg-white border-gray-300'
                required
                value={shippingData.address}
                onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='card' className='font-bold'>
                Tarjeta
              </Label>
              <Input 
                id='card'
                placeholder='Ingresá tu tarjeta'
                className='bg-white border-gray-300'
                required
                pattern='[0-9]{13,19}'
                title='Ingresá los números de tu tarjeta sin espacios ni guiones'
                inputMode='numeric'
                value={shippingData.card}
                onChange={(e) => setShippingData({...shippingData, card: e.target.value.replace(/\D/g, '')})}
              />
            </div>
            <Button 
              type='submit' // Activador del form
              className='w-full bg-[#0f172a] text-white hover:bg-[#1e293b] mt-4 py-6 text-lg font-bold cursor-pointer'
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Confirmar compra'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}