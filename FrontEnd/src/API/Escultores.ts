const API_URL = 'http://localhost:5232';

//Obtenemos todos los escultores
export const getEscultores = async (pageNumber: number, pageSize: number, edicion: string, busqueda: string) => {
  try {
    const response = await fetch(`${API_URL}/Escultor?pageNumber=${pageNumber}&pageSize=${pageSize}&AnioEdicion=${edicion}&busqueda=${busqueda}`);
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
