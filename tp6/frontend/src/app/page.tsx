'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import { productService } from '@/services/productService';
import { cartService } from '@/services/cartService';
import { ProductCard } from '@/components/products/ProductCard';
import { CartSidebar } from '@/components/cart/CartSidebar';
import Filter from '@/components/filters/Filter';
import { toast } from 'sonner';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de los filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'all' || product.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

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

      {/* Insertamos el componente Filter pasándole los setters de los estados */}
      <Filter onSearch={setSearchTerm} onCategoryChange={setCategory} />

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
        <div className='lg:col-span-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
            {/* Feedback visual si no hay resultados */}
            {filteredProducts.length === 0 && (
              <p className='col-span-full text-center py-10 text-muted-foreground'>
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
            )}
          </div>
        </div>

        <aside className='lg:col-span-4 sticky top-4'>
          <CartSidebar />
        </aside>
      </div>
    </main>
  );
}
