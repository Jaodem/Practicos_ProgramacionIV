import { Product } from '@/types/product';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // Regla de negocio, si no hay stock, el producto esta agotado
  const isOutOfStock = product.stock <= 0;

  // URL de FastApi
  const BACKEND_URL = 'http://localhost:8000/static'

  return (
    <Card className='flex flex-col h-full shadow-sm overflow-hidden'>
      <div className='relative h-64 w-full bg-white p-4 flex items-center justify-center border-b'>
        <img
          src={`${BACKEND_URL}/${product.image_url.replace('imagenes/', 'images/')}`}
          alt={product.name}
          className='max-h-full max-w-full object-contain'
        />
      </div>
      <CardHeader>
        <div className='flex justify-between items-start'>
          <Badge variant='outline' className='capitalize'>
            {product.category}
          </Badge>
          {isOutOfStock && (
            <Badge variant='destructive'>
              Agotado
            </Badge>
          )}
        </div>
        <CardTitle className='text-xl mt-2'>
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className='grow'>
        <p className='text-sm text-muted-foreground line-clamp-3'>
          {product.description}
        </p>
        <div className='mt-4'>
          <span className='text-2xl font-bold'>
            ${product.price.toLocaleString()}
          </span>
          <p className={`text-xs mt-1 ${isOutOfStock ? 'text-red-500 font-semibold' : 'text-muted-foreground'}`}>
            {isOutOfStock ? 'Sin unidades disponibles' : `Disponible: ${product.stock}`}
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className='w-full'
          disabled={isOutOfStock}
          onClick={() => onAddToCart(product.id)}
        >
          {isOutOfStock ? 'Agotado' : 'Agregar al carrito'}
        </Button>
      </CardFooter>
    </Card>
  );
}