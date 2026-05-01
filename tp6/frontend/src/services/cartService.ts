import { CartDetail } from "@/types/cart";

const API_URL = 'http://localhost:8000';

export const cartService = {
  addToCart: async (productId: number, quantity: number = 1): Promise<{
    message: string,
    cart_id: number
  }> => {
    const res = await fetch(`${API_URL}/cart/add/${productId}?quantity=${quantity}`, {
      method: 'POST',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || 'Error al añadir al carrito');
    }

    return res.json();
  },

  getCart: async (): Promise<CartDetail> => {
    const res = await fetch(`${API_URL}/cart`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || 'Error al obtener el carrito')
    }

    return res.json();
  },

  cancel: async (): Promise<{
    message: string
  }> => {
    const res = await fetch(`${API_URL}/cart/cancel`, {
      method: 'POST',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || 'Error al cancelar el carrito');
    }

    return res.json();
  },

  checkout: async (): Promise<{
    message: string
  }> => {
    const res = await fetch(`${API_URL}/cart/checkout`, {
      method: 'POST',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || 'Error al realizar el checkout');
    }
    
    return res.json();
  }
}