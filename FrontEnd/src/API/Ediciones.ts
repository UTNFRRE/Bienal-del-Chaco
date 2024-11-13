const API_URL = 'http://localhost:5232';

//Obtenemos todas las ediciones
export const getEdiciones = async () => {
  try {
    const response = await fetch(`${API_URL}/Edicion`);
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

export const addEdicion = async (anio: string, fechaInicio: string, fechaFin:string)  => {
  const formData = new FormData();
  formData.append('año', anio);
  formData.append('FechaInicio', fechaInicio);
  formData.append('FechaFin', fechaFin);

  try {
    const response = await fetch(`${API_URL}/Edicion`, {
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