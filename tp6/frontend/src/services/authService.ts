const API_URL = 'http://localhost:8000/auth';

export const authService = {
  register: async (userData: { name: string, email: string, password: string }) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Error al registrarse');
    }
    
    return await res.json();
  }
}