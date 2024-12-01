export const API_URL = 'http://localhost:5232';
import useCookies from 'js-cookie';

export const addVoto = async (
    esculturaId: number,
    puntuacion: number,
) => {
    
    const userId = useCookies.get('IdUser');
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


export const GetToken = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/Esculturas/GetToken?esculturaId=${id}`);
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

export const TokenValido = async (token: string, esculturaId: number) => {
    try {
        const response = await fetch(`${API_URL}/Esculturas/Token`, {
            method: 'HEAD',
            headers: {
                'token': token,
                'idEscultura': esculturaId.toString(),
            }
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error('Network error: ' + error);
    }
};
