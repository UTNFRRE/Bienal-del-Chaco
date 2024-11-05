const API_URL = 'http://localhost:5232';

export const getProximosEventos = async () => {
    try {
        const response = await fetch(`${API_URL}/Eventos/next`,
            {
                method: 'GET',
            }
        )
        ;
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

export const getEventosDia = async (fecha:string) => {
    try {
        const response = await fetch(`${API_URL}/Eventos/fecha/${fecha}`,
            {
                method: 'GET',
            }
        )
        ;
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

export const getEventosId = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/Eventos/${id}`,
            {
                method: 'GET',
            }
        )
        ;
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