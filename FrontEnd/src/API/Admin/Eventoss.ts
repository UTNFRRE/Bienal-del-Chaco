const API_URL = 'http://localhost:5232';

//Obtener todos los eventos

export const getEventos = async () => {
    try {
        const response = await fetch(`${API_URL}/Eventos/GetAll`);
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
