import { Product } from "@/types/product";

const API_URL = 'http://localhost:8000';

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || 'Error al cargar los productos')
    }
    
    return res.json();
  },

  getById: async (id: number): Promise<Product> => {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || 'Producto no encontrado');
    }
    
    return res.json();
  }
}