'use client';

import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/sonner';

export function Providers({
  children
}: {
  children: React.ReactNode;
  }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <Toaster position='bottom-right' richColors />
      </CartProvider>
    </AuthProvider>
  );
}