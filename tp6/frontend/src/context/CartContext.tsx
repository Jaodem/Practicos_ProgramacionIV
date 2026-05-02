'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartDetail } from '@/types/cart';
import { cartService } from '@/services/cartService';
import { toast } from 'sonner';

interface CartContextType {
  cart: CartDetail | null;
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    try {
      const data = await cartService.getCart();
      setCart(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(`No se puedo sincronizar el carrito: ${message}`);
    }
  };

  const addToCart = async (productId: number, quantity: number = 1) => {
    setLoading(true);
    try {
      await cartService.addToCart(productId, quantity);
      await refreshCart();
      toast.success('Producto añadido al carrito');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    setLoading(true);
    try {
      const res = await cartService.removeFromCart(productId);
      await refreshCart();
      toast.success(res.message);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initCart = async () => {
      await refreshCart();
    };
    initCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider')
  return context;
};