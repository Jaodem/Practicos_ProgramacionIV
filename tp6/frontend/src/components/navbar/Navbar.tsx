'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import dynamic from 'next/dynamic';

function NavbarComponent() {
  const pathname = usePathname();
  const { user, isLoggedIn, logout } = useAuth();

  const getLinkStyles = (path: string) => {
    const isActive = pathname === path;
    return `px-3 py-2 rounded-md transition-colors ${
      isActive 
        ? 'bg-secondary text-foreground font-bold' 
        : 'text-muted-foreground hover:bg-secondary/50 hover:text-primary'
    }`;
  };

  return (
    <nav className='border-b bg-white sticky top-0 z-50'>
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <Link href='/' className='text-xl font-bold tracking-tighter'>
          TP6 Shop
        </Link>

        <div className='flex items-center gap-6 text-sm font-medium'>
          <Link href='/' className={getLinkStyles('/')}>
            Productos
          </Link>

          {isLoggedIn ? (
            <>
              <Link href='/purchase' className={getLinkStyles('/purchase')}>
                Mis compras
              </Link>
              <span className='text-muted-foreground border-l pl-6'>
                {user}
              </span>
              <Button
                variant='ghost'
                size='sm'
                className='font-bold text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer'
                onClick={logout}
              >
                Salir
              </Button>
            </>
          ) : (
            <>
              <Link href='/login' className={getLinkStyles('/login')}>
                Ingresar
              </Link>
              <Link href='/register'>
                <Button
                  variant={pathname === '/register' ? 'secondary' : 'ghost'}
                  size='sm'
                  className={`cursor-pointer font-bold ${pathname === '/register' ? 'bg-secondary' : ''}`}
                >
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

export const Navbar = dynamic(() => Promise.resolve(NavbarComponent), {
  ssr: false,
});