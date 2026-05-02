'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { productService } from '@/services/productService';
import { cartService } from '@/services/cartService';
import { ProductCard } from '@/components/products/ProductCard';
import { CartSidebar } from '@/components/cart/CartSidebar';
import { toast } from 'sonner';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAll();
        setProducts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Error al conectar con el servidor');
        } else setError('Ocurrió un error inesperado');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: number) => {
    try {
      await cartService.addToCart(productId);
      toast.success('Producto añadido al carrito');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      toast.error(`No se pudo añadir: ${message}`);
    }
  };

  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center h-screen text-lg'>
        Cargando catálogo...
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center h-screen text-red-500'>
        <p className='font-bold'>
          Hubo un error:
        </p>
        {error}
      </div>
    );
  }
  
  return (
    <main className='container mx-auto py-10 px-4'>
      <header className='mb-10 text-center'>
        <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Nuestra Tienda
        </h1>
        <p className='text-muted-foreground mt-2'>
          Explorá nuestros productos con stock actualizado en tiempo real.
        </p>
      </header>

      {/* Grilla principal del Layout */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        {/* Sección de productos 8 columnas */}
        <div className='lg:col-span-8'>
          {/* Sección de productos */}
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Sección de Carrito 4 columnas */}
        <aside className='lg:col-span-4 sticky top-4'>
          <CartSidebar />
        </aside>
      </div>
    </main>
  );
}
