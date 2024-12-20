
import Cookies from 'js-cookie';

const API_URL = 'https://bienalbackapi.azurewebsites.net';


//Obtener todos los eventos

export const getEventos = async (edicion: string) => {
  try {
    const response = await fetch(`${API_URL}/Eventos?AnioEdicion=${edicion}`);
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

// Agregar un evento  (aun falta lo de latitud y longitud)

export const addEvento = async (
  Nombre: string,
  Fecha: string,
  Lugar: string,
  Descripcion: string,
  Tematica: string,
  longitud: number,
  latitud: number,
  edicion: string
) => {
  const formData = new FormData();
  const token = Cookies.get('access_token');
  formData.append('Nombre', Nombre);
  formData.append('Fecha', Fecha);
  formData.append('Lugar', Lugar);
  formData.append('Descripcion', Descripcion);
  formData.append('Tematica', Tematica);
  formData.append('longitud', longitud.toString().replace('.', ','));
  formData.append('latitud', latitud.toString().replace('.', ','));
  formData.append('EdicionAño', edicion);

  try {
    const response = await fetch(`${API_URL}/Eventos`, {
      method: 'POST',
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
};

// Editar Evento existente

export const editEvento = async (
  Id: string,
  Nombre: string,
  Fecha: string,
  Lugar: string,
  Descripcion: string,
  Tematica: string,
  longitud: number,
  latitud: number
) => {
  const formData = new FormData();
  const token = Cookies.get('access_token');
  formData.append('Nombre', Nombre);
  formData.append('Fecha', Fecha);
  formData.append('Lugar', Lugar);
  formData.append('Descripcion', Descripcion);
  formData.append('Tematica', Tematica);
  formData.append('longitud', longitud.toString().replace('.', ','));
  formData.append('latitud', latitud.toString().replace('.', ','));

  try {
    const response = await fetch(`${API_URL}/Eventos/${Id}`, {
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
};

// Eliminar un evento

export const deleteEvento = async (Id: string) => {
  const token = Cookies.get('access_token');
  try {
    const response = await fetch(`${API_URL}/Eventos/${Id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      return;
    } else {
      throw new Error('Error en la respuesta del servidor');
    }
  } catch (error) {
    throw new Error('Network error: ' + error);
  }
};
