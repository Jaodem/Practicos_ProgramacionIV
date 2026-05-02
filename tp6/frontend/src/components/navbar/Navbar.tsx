'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const pathname = usePathname();

  // Por ahora solamente simulamos un usuario logueado
  const isLoggedIn = false;
  const userName = 'Juan Perez'

  return (
    <nav className='border-b bg-white sticky top-0 z-50'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        {/* Logo / Título */}
        <Link href='/' className='text-xl font-bold tracking-tighter'>
          TP6 Shop
        </Link>

        {/* Links de Navegación */}
        <div className='flex items-center gap-6 text-sm font-medium'>
          <Link
            href='/'
            className={`transition-colors hover:text-primary ${pathname === '/' ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Productos
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                href='/compras'
                className={`transition-colors hover:text-primary ${pathname === '/compras' ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Mis compras
              </Link>
              <span className='text-muted-foreground border-l pl-6'>
                {userName}
              </span>
              <Button variant='ghost' size='sm' className='font-bold text-red-500 hover:text-red-600 hover:bg-red-50'>
                Salir
              </Button>
            </>
          ) : (
              <>
                <Link
                  href='/login'
                  className={`transition-colors hover:text-primary ${pathname === '/login' ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  Ingresar
                </Link>
                
                <Link href='/registro'>
                  <Button variant={pathname === '/registro' ? 'default' : 'secondary'} size='sm'>
                    Crear cuenta
                  </Button>
                </Link>
              </>
          )}
        </div>
      </div>
    </nav>
  );
}