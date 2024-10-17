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
}




//aca se hace la solicutud a la API para obtener los eventos, mientras  q no hay api se usa un array de objetos
const Eventos = [
    {
        id: 1,
        titulo: "Ejemplo 1",
        fecha: "2021-08-01",
        descripcion: "Descrpcion del evento 1",
        lugar: "Av las heras 812",
        tematica: "River",
        latitud: -27.46371294429546,
        longitud: -58.986895228835934
    },
];
export default Eventos;