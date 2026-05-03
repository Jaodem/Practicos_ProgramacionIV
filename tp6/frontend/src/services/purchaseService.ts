const API_URL = 'http://localhost:8000/purchase';

export const purchaseService = {
  getHistory: async () => {
    const response = await fetch(`${API_URL}/history`);
    if (!response.ok) throw new Error('Error al obtener el historial');
    return await response.json();
  }
};