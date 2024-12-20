
import Cookies from 'js-cookie';


import { useEdicion } from "../../EdicionContexto";


const API_URL = 'https://bienalbackapi.azurewebsites.net';


// Obtener todas las obras
export const getObras = async (currentPage: number, pageSize: number, edicion:string, busqueda: string) => {
  try {
    const response = await fetch(
      `${API_URL}/Esculturas/GetAll?pageNumber=${currentPage}&pageSize=${pageSize}&AnioEdicion=${edicion}&busqueda=${busqueda}`
    );
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

// Agregar una nueva obra
export const addObra = async (
  titulo: string,
  tematica: string,
  fecha: string,
  autor: number,
  paisAutor: string,
  descripcion: string,
  imagen: File[],
  edicion: string
) => {
  const formData = new FormData();
  const token = Cookies.get('access_token');

  formData.append('Nombre', titulo);
  formData.append('Descripcion', descripcion);

  for (let i = 0; i < imagen.length; i++) {
    formData.append('Imagenes', imagen[i]);
  }

  formData.append('EscultorID', autor.toString());
  formData.append('FechaCreacion', fecha);
  formData.append('Tematica', tematica);
  formData.append('EdicionAño', edicion);

  try {
    const response = await fetch(`${API_URL}/Esculturas`, {
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

// Editar una obra existente
export const editObra = async (
  id: number,
  titulo: string,
  tematica: string,
  fecha: string,
  autor: number,
  paisAutor: string,
  descripcion: string,
  imagen: (string | File)[],
  edicion:string
) => {
  const formData = new FormData();
  const token = Cookies.get('access_token');
  console.log('imagaaba', imagen)

    formData.append('Nombre', titulo);
    formData.append('Descripcion', descripcion);
   
    for (let i = 0; i < imagen.length; i++) {
      if (imagen[i] instanceof File) {
        formData.append('NuevasImagenes', imagen[i]);
      }
    }

    formData.append('EscultorID', autor.toString());
    formData.append('FechaCreacion', fecha);
    formData.append('Tematica', tematica);

  try {
    const response = await fetch(`${API_URL}/Esculturas/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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

// Eliminar una obra
export const deleteObra = async (id: number) => {
  const token = Cookies.get('access_token');
  try {
    const response = await fetch(`${API_URL}/Esculturas/${id}`, {
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

export const getObraById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/Esculturas/GetDetail/${id}`);
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

// Obtener todos los escultores
export const getEscultores = async (edicion:string) => {
  try {
    const response = await fetch(`${API_URL}/Escultor/api/escultoresPublic?AnioEdicion=${edicion}`);
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


export const getObraByEscultor = async (id: string) => {
  try {
      const response = await fetch(`${API_URL}/Escultor/${id}/esculturas`);
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

