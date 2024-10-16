const API_URL = 'http://localhost:5232'; // Reemplaza con la URL de tu backend

export const getEscultorbyID = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/Escultor/${id}`);
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