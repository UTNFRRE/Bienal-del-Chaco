const API_URL = 'https://bienalbackapi.azurewebsites.net';

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
