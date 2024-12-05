const API_URL = 'http://localhost:5232'; 
import Cookies from 'js-cookie';

export const getEscultorById = async (id: string) => {
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

//Obtener un escultor
export const getEscultor = async (currentPage: number, pageSize:number, filter:string, edicion: string) => {
  try {
    const response = await fetch(`${API_URL}/Escultor?pageNumber=${currentPage}&pageSize=${pageSize}&AnioEdicion=${edicion}&busqueda=${filter}`);
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

//Agregar un nuevo escultor
export const addEscultor = async (
  nombre: string,
  pais: string,
  telefono: string,
  fechaNacimiento: string,
  lugarNacimiento: string,
  premios: string,
  edicionAño: string,
  foto: File,
) => {
  const formData = new FormData();
  const token = Cookies.get('access_token');
  formData.append('Nombre', nombre);
  formData.append('Apellido', 'Lopez Soto');
  formData.append('DNI', '12345678');  
  formData.append('FechaNacimiento', fechaNacimiento);
  formData.append('LugarNacimiento', lugarNacimiento);
  formData.append('Premios', premios);
  formData.append('Pais', pais);
  formData.append('Telefono', telefono);
  formData.append('Biografia', 'Biografia');
  formData.append('Imagen', foto);
  formData.append('EdicionAño', edicionAño);

  try {
    const response = await fetch(`${API_URL}/Escultor`, {
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


export const editEscultor = async (
  escultorId: string,
  nombre: string,
  pais: string,
  contacto: string,
  fechaNacimiento: string,
  lugarNacimiento: string,
  premios: string,
  edicionAño: string,
  foto: File | string,
) => {
  const formData = new FormData();
  const token = Cookies.get('access_token');
  var method = '';
  if (typeof foto === 'string') {
    formData.append('Nombre', nombre);    
    formData.append('FechaNacimiento', fechaNacimiento);
    formData.append('LugarNacimiento', lugarNacimiento);
    formData.append('Premios', premios);
    formData.append('Pais', pais);
    formData.append('Telefono', contacto);
  method = 'PATCH';
  } else {
    formData.append('Nombre', nombre);
    formData.append('Apellido', 'Lopez Soto');
    formData.append('DNI', '12345678');    
    formData.append('FechaNacimiento', fechaNacimiento);
    formData.append('LugarNacimiento', lugarNacimiento);
    formData.append('Premios', premios);
    formData.append('Pais', pais);
    formData.append('Telefono', contacto);
    formData.append('Biografia', 'Biografia');
    formData.append('Imagen', foto);
    formData.append('EdicionAño', edicionAño);
    method = 'PUT';
  }
 
  try {
    const response = await fetch(`${API_URL}/Escultor/${escultorId}`, {
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


// Eliminar un escultor
export const deleteEscultor = async (id: string)  => {
  const token = Cookies.get('access_token');
  try {
    const response = await fetch(`${API_URL}/Escultor/${id}`, {
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
