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
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('esculturaId', esculturaId.toString()); // Convertir a string

    try {
        const response = await fetch(`${API_URL}/Votos`, {
            method: 'HEAD',
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
}

