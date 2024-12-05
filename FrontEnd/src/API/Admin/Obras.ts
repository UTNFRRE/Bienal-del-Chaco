const API_URL = 'http://localhost:5232';
import Cookies from 'js-cookie';

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
  imagen: File,
  edicion: string
) => {
  const formData = new FormData();
  const token = Cookies.get('access_token');

  formData.append('Nombre', titulo);
  formData.append('Descripcion', descripcion);
  formData.append('Imagen', imagen);
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
  id: string,
  titulo: string,
  tematica: string,
  fecha: string,
  autor: number,
  paisAutor: string,
  descripcion: string,
  imagen: File | string,
  edicion:string
) => {
  const formData = new FormData();
  const token = Cookies.get('access_token');
  var method = '';

  if (typeof imagen === 'string') {
    formData.append('Nombre', titulo);
    formData.append('Descripcion', descripcion);
    formData.append('EscultorID', autor.toString());
    formData.append('FechaCreacion', fecha);
    formData.append('Tematica', tematica);
    method = 'PATCH';
  } else {
    formData.append('Nombre', titulo);
    formData.append('Descripcion', descripcion);
    formData.append('Imagen', imagen);
    formData.append('EscultorID', autor.toString());
    formData.append('FechaCreacion', fecha);
    formData.append('Tematica', tematica);
    formData.append('EdicionAño', edicion);
    method = 'PUT';
  }

  try {
    const response = await fetch(`${API_URL}/Esculturas/${id}`, {
      method: `${method}`,
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
export const deleteObra = async (id: string) => {
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

