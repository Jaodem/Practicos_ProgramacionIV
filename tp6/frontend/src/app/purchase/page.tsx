'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { purchaseService } from '@/services/purchaseService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

interface PurchaseItem {
  name: string;
  quantity: number;
  price: number;
  tax: number;
}

interface Purchase {
  id: number;
  date: string;
  total_amount: number;
  address: string;
  card_last_digits: string;
  subtotal: number;
  tax_total: number;
  shipping: number;
  items: PurchaseItem[];
}

export default function PurchasePage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await purchaseService.getHistory();
        setPurchases(data);
        if (data.length > 0) setSelectedPurchase(data[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return (
    <div className='p-10 text-center'>
      Cargando compras...
    </div>);

  return (
    <div className='container mx-auto py-10 px-4 max-w-5xl'>
      <h1 className='text-4xl font-bold mb-10'>
        Mis compras
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 items-start'>
        
        {/* Columna Izquierda: Listado con scroll interno */}
        <div className='space-y-4 overflow-y-auto pr-2 custom-scrollbar'>
          {purchases.map((p) => (
            <Card
              key={p.id}
              className={`cursor-pointer transition-all border-2 ${
                selectedPurchase?.id === p.id 
                  ? 'bg-slate-50 border-slate-400 shadow-sm' 
                  : 'border-slate-100 hover:border-slate-300'
              }`}
              onClick={() => setSelectedPurchase(p)}
            >
              <CardContent className='p-4'>
                <p className='font-bold text-lg'>
                  Compra #{p.id}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {format(new Date(p.date), 'dd/MM/yyyy, HH:mm', { locale: es })}
                </p>
                <p className='font-bold mt-2'>
                  Total: ${p.total_amount}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Columna Derecha: Detalle de compra */}
        {selectedPurchase && (
          <Card className='md:col-span-2 shadow-sm border-slate-200 overflow-y-auto'>
            <CardContent className='p-8 space-y-8'>
              <h2 className='text-3xl font-bold border-b pb-4'>
                Detalle de la compra
              </h2>
              
              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div>
                  <p className='font-bold text-base'>
                    Compra #: <span className='font-normal'>{selectedPurchase.id}</span>
                  </p>
                  <p className='font-bold text-base'>
                    Dirección: <span className='font-normal'>{selectedPurchase.address}</span>
                  </p>
                </div>
                <div>
                  <p className='font-bold text-base'>
                    Fecha: <span className='font-normal'>{format(new Date(selectedPurchase.date), 'dd/MM/yyyy, HH:mm', { locale: es })}</span>
                  </p>
                  <p className='font-bold text-base'>
                    Tarjeta: <span className='font-normal'>****-****-****-{selectedPurchase.card_last_digits}</span>
                  </p>
                </div>
              </div>

              <div className='space-y-4 pt-4 border-t'>
                <p className='font-bold text-lg'>
                  Productos
                </p>
                {selectedPurchase.items?.map((item, i) => (
                  <div key={i} className='flex justify-between items-center border-b border-slate-50 pb-3'>
                    <div>
                      <p className='font-bold text-base'>
                        {item.name}
                      </p>
                      <p className='text-xs text-muted-foreground italic'>
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                    <div className='text-right'>
                      <p className='font-bold text-base'>
                        ${item.price}
                      </p>
                      <p className='text-[10px] text-muted-foreground italic text-gray-400'>
                        IVA: ${item.tax}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className='pt-4 space-y-1 text-base'>
                <div className='flex justify-between italic text-muted-foreground'>
                  <span>Subtotal:</span> <span>${selectedPurchase.subtotal}</span>
                </div>
                <div className='flex justify-between italic text-muted-foreground'>
                  <span>IVA:</span> <span>${selectedPurchase.tax_total}</span>
                </div>
                <div className='flex justify-between italic text-muted-foreground'>
                  <span>Envío:</span> <span>${selectedPurchase.shipping}</span>
                </div>
                <div className='flex justify-between text-3xl font-bold pt-6 text-slate-900 border-t'>
                  <span>Total pagado:</span> <span>${selectedPurchase.total_amount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}