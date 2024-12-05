const API_URL = 'http://localhost:5232';
import Cookies from "js-cookie";

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

export const EditVotacion = async (id: string, valor: boolean) => {
  const formData = new FormData();
  formData.append('VotacionHabilitada', valor.toString());
  const token = Cookies.get('access_token');
  try {
    const response = await fetch(`${API_URL}/Edicion/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
}

export const GetVotacion = async (id: string) => {
  try {
    const token = Cookies.get('access_token'); 
    const response = await fetch(`${API_URL}/Edicion/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
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
}