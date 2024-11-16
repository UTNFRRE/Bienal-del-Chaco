const API_URL = 'http://localhost:5232';

export const addVoto = async (
    userId: string,
    esculturaId: number,
    puntuacion: number,
) => {
    
    
    try {
        const response = await fetch(`${API_URL}/Votos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId, esculturaId, puntuacion}),
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


export const HeadVotos = async(
    userId: string,
    esculturaId: number,
) => {

    try {
        const response = await fetch(`${API_URL}/Votos?userid=${userId}&esculturaid=${esculturaId}`, {
            method: 'HEAD',
        });

       return response;
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
}

