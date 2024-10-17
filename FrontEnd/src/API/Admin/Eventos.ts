// import Cookies from 'js-cookie';
// const URL= import.meta.env.VITE_URL_DEV;

export const FetchPostEvento = async (
    titulo_evento: string,
    lugar: string,
    tematica:string,
    descripcion:string,
    fecha:string
  ) => {
    try {
      // const token = Cookies.get('access_token');

      const response = await fetch('URL DE LA API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //    Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo_evento, lugar, tematica, descripcion, fecha }),
      });

      if (response.ok) {
        return;
      } else {
        const errorData = await response.json();
        throw new Error(`Error en la respuesta del servidor: ${errorData.message}`);
      }
    } catch (error) {
        console.error('Network error:', error);
    }
};

export const FetchEventos = async () => {
    try {
      // const token = Cookies.get('access_token');
  
      const response = await fetch('',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
          },
        }
      );
  
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


export const FetchPutEvento = async (
    id_evento: number,
    titulo_evento: string,
    lugar: string,
    tematica:string,
    descripcion:string,
    fecha:string
) => {
  try {
    // const token = Cookies.get('access_token');

    const response = await fetch(`URL DE LA API/${id_evento}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
         // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ titulo_evento, lugar, tematica, descripcion, fecha }),
    });

    if (response.ok) {
      return;
    } else {
      const errorData = await response.json();
      throw new Error(`Error en la respuesta del servidor: ${errorData.message}`);
    }
  } catch (error) {
      console.error('Network error:', error);
  }
};

export const FetchDeleteEvento = async (id_evento: number) => {
  try {
    // const token = Cookies.get('access_token');

    const response = await fetch(`URL DE LA API/${id_evento}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
         // Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return;  
    } else {
      const errorData = await response.json();
      throw new Error(`Error en la respuesta del servidor: ${errorData.message}`);
    }
  }
  catch (error) {
    console.error('Network error:', error);
  }
}



//aca se hace la solicutud a la API para obtener los eventos, mientras  q no hay api se usa un array de objetos
const Eventos = [
    {
        id: 1,
        titulo: "Evento 1",
        fecha: "2021-08-01",
        descripcion: "Descrpcion del evento 1",
        lugar: "Av las heras 812",
        tematica: "River",
        latitud: -27.46371294429546,
        longitud: -58.986895228835934
    },
    {
        id: 2,
        titulo: "Evento 2",
        fecha: "2021-08-01",
        descripcion: "Descrpcion del evento 2",
        lugar: "Av las heras 812",
        tematica: "River",
        latitud: -27.451087831382576, 
        longitud:-58.97901544828362
    },
    {
        id: 3,
        titulo: "Evento 3",
        fecha: "2021-08-01",
        descripcion: "Descrpcion del evento 3",
        lugar: "Av las heras 812",
        tematica: "River",
        latitud: -34.603722,
        longitud: -58.381592
    },
    {
        id: 4,
        titulo: "Evento 4",
        fecha: "2021-08-01",
        descripcion: "Descrpcion del evento 4",
        lugar: "Av las heras 812",
        tematica: "River",
        latitud: -34.603722,
        longitud: -58.381592
    },
    {
        id: 5,
        titulo: "Evento 5",
        fecha: "2021-08-01",
        descripcion: "Descrpcion del evento 5",
        lugar: "Av las heras 812",
        tematica: "River",
        latitud: -34.603722,
        longitud: -58.381592
    },
    {
        id: 6,
        titulo: "Evento 6",
        fecha: "2021-08-01",
        descripcion: "Descrpcion del evento 6",
        lugar: "Av las heras 812",
        tematica: "River",
        latitud: -34.603722,
        longitud: -58.381592
    },
    {
        id: 7,
        titulo: "Evento 7",
        fecha: "2021-08-01",
        descripcion: "Descrpcion del evento 7",
        lugar: "Av las heras 812",
        tematica: "River",
        latitud: -34.603722,
        longitud: -58.381592
    },
    {
        id: 8,
        titulo: "Evento 8",
        fecha: "2021-08-01",
        descripcion: "Descrpcion del evento 8",
        lugar: "Av las heras 812",
        tematica: "River",
        latitud: -34.603722,
        longitud: -58.381592
    },
    {
        id: 9,
        titulo: "Evento 9",
        fecha: "2021-08-01",
        descripcion: "Descrpcion del evento 9",
        lugar: "Av las heras 812",
        tematica: "River",
        latitud: -34.603722,
        longitud: -58.381592
    },
    {
        id: 10,
        titulo: "Evento 10",
        fecha: "2021-08-01",
        descripcion: "Descrpcion del evento 10",
        lugar: "Av las heras 812",
        tematica: "River",
        latitud: -34.603722,
        longitud: -58.381592
    },
];
export default Eventos;