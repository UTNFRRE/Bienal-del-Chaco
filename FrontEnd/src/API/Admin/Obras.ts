const API_URL = 'http://localhost:5232'; // Reemplaza con la URL de tu backend

// Obtener todas las obras
export const getObras = async (currentPage: number, pageSize: number ) => {
    try {
        const response = await fetch(`${API_URL}/Esculturas/GetAllLite?pageNumber=${currentPage}&pageSize=${pageSize}`);
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
export const addObra = async (titulo: string, tematica: string, fecha:string, autor: number, paisAutor: string, descripcion: string, imagen:File ) => {

    const formData = new FormData();
    formData.append('Nombre', titulo);
    formData.append('Descripcion', descripcion);
    formData.append('Imagen', imagen);
    formData.append('EscultorID', autor.toString());
    formData.append('FechaCreacion', fecha);
    formData.append('Tematica', tematica);
   
    try {
        const response = await fetch(`${API_URL}/Esculturas`, {
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

// Editar una obra existente
export const editObra = async (id: string, titulo: string, tematica: string, fecha:string, autor: number, paisAutor: string, descripcion: string, imagen: File | string ) => {
  
  const formData = new FormData();
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
    method = 'PUT';
  }
 
  console.log(method);
  try {
  const response = await fetch(`${API_URL}/Esculturas/${id}`, {
    method: `${method}`,
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
    try {
        const response = await fetch(`${API_URL}/Esculturas/${id}`, {
            method: 'DELETE',
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
export const getEscultores = async () => {
    try {
        const response = await fetch(`${API_URL}/Escultor/api/escultoresPublic`);
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