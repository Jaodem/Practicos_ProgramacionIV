'use client';

import { useCart } from '@/context/CartContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, confirmCheckout, loading } = useCart();
  const router = useRouter();

  const handleFinalize = async () => {
    try {
      await confirmCheckout();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className='container mx-auto py-20 text-center'>
        <h2 className='text-2xl font-bold'>
          No hay productos en el carrito
        </h2>
        <Button onClick={() => router.push('/')}>
          Volver a la tienda
        </Button>
      </div>
    );
  }
  return (
    <div className='container mx-auto py-10 px-4'>
      <h1 className='text-3xl font-bold mb-8 italic'>
        Finalizar Compra
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <Card className='md:col-span2 shadow-sm'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              Resumen del carrito
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6 pb-4'>
            {cart.items.map((item) => (
              <div key={item.product_id} className='flex justify-between items-start border-b pb-4'>
                <div className='space-y-1'>
                  <p className='font-bold text-lg'>
                    {item.name}
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
              <div className='flex justify-between italic'>
                <span>Total productos:</span> <span>${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className='flex justify-between italic'>
                <span>IVA:</span> <span>${cart.tax.toFixed(2)}</span>
              </div>
              <div className='flex justify-between italic'>
                <span>Envío:</span> <span>${cart.shipping.toFixed(2)}</span>
              </div>
              <div className='flex justify-between text-2xl font-bold pt-4 border-t'>
                <span>Total a pagar:</span> <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='h-fit shadow-sm'>
          <CardHeader>
            <CardTitle className='text-2xñ font-bold'>
              Datos de envío
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4 pb-6'>
            <div className='space-y-2'>
              <Label htmlFor='address' className='font-bold'>
                Dirección
              </Label>
              <Input id='address' placeholder='Ingresá tu dirección' className='bg-white' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='card' className='font-bold'>
                Tarjeta
              </Label>
              <Input id='card' placeholder='Ingresá tu tarjeta' className='bg-white' />
            </div>
            <Button
              className='w-full bg-[#0f172a] text-white hover:bg-[#1e293b] mt-4 py-6 text-lg font-bold cursor-pointer'
              onClick={handleFinalize}
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Confirmar compra'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}