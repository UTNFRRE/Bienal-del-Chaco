const API_URL = 'http://localhost:5232';

//Obtener todos los eventos

export const getEventos = async () => {
    try {
        const response = await fetch(`${API_URL}/Eventos`);
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

export const addEvento = async ( Nombre: string, Fecha: string,  Lugar: string, Descripcion: string, Tematica: string) => {
    
    const formData = new FormData();
    formData.append('Id', '0'); // No se si esta bien el Id, 
    formData.append('Nombre', Nombre);
    formData.append('Fecha', Fecha);
    formData.append('Lugar', Lugar);
    formData.append('Descripcion', Descripcion);
    formData.append('Tematica', Tematica);
    

    try {
        const response = await fetch(`${API_URL}/Eventos`, {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }else {
            throw new Error('Error en la respuesta del servidor');
        }
    } catch (error){
        throw new Error('Network error: ' + error);
    }
};



// Editar Evento existente

export const editEvento = async (Id:string, Nombre: string, Fecha: string,  Lugar: string, Descripcion: string, Tematica: string) =>{
    const formData = new FormData();
    formData.append('Nombre', Nombre);
    formData.append('Fecha', Fecha);
    formData.append('Lugar', Lugar);
    formData.append('Descripcion', Descripcion);
    formData.append('Tematica', Tematica);

    try {
        const response = await fetch(`${API_URL}/Eventos/${Id}`, {
            method: 'PUT',
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    }catch (error){
        throw new Error('Network error: ' + error);
    }
}


// Eliminar un evento

export const deleteEvento = async (Id:string) => {
    try {
        const response = await fetch(`${API_URL}/Eventos/${Id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            return;
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    } catch(error){
        throw new Error('Network error: ' + error);
    }
};
