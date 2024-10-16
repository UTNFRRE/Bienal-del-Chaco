const API_URL = 'https://your-backend-api-url.com'; // Reemplaza con la URL de tu backend

// Obtener todas las obras
export const getObras = async () => {
    try {
        const response = await fetch(`${API_URL}/obras`);
        if (!response.ok) {
            throw new Error('Error al obtener las obras');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener las obras:', error);
        throw error;
    }
};

// Agregar una nueva obra
export const addObra = async (titulo: string, tematica: string, fecha:string, autor: number, paisAutor: string, descripcion: string, imagen:File ) => {

    const formData = new FormData();
    formData.append('nombre', titulo);
    formData.append('tematica', tematica);
    formData.append('fechaCreacion', fecha);
    formData.append('escultor', autor.toString());
    formData.append('escultorPais', paisAutor);
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagen);

    try {
        const response = await fetch(`${API_URL}/obras`, {
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
export const editObra = async (id: string, obraData: FormData) => {
    try {
        const response = await fetch(`${API_URL}/obras/${id}`, {
            method: 'PUT',
            body: obraData,
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
        const response = await fetch(`${API_URL}/obras/${id}`, {
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