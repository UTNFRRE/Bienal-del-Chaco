const API_URL = 'http://localhost:5232';

export const addVoto = async (
    userId: string,
    esculturaId: number,
    puntuacion: number,
  ) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('esculturaId', esculturaId);
    formData.append('puntuacion', puntuacion);  
    try {
      const response = await fetch(`${API_URL}/Votos`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Error en la respuesta del servidor');
      }
    } catch (error) {
      throw new Error('Network error: ' + error);
    }
  };