export const FetchPostEscultor = async (
  foto: string,
  nombre: string,
  pais: string,
  contacto: string,
  fechaNacimiento: string,
  lugarNacimiento: string,
  premios: string
) => {
  try {
    const response = await fetch('URL DE LA API', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        foto,
        nombre,
        pais,
        contacto,
        fechaNacimiento,
        lugarNacimiento,
        premios,
      }),
    });

    if (response.ok) {
      return;
    } else {
      const errorData = await response.json();
      throw new Error(
        `Error en la respuesta del servidor: ${errorData.message}`
      );
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

export const FetchEscultor = async () => {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${token}`,
      },
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

export const FetchPutEscultor = async (
  foto: string,
  nombre: string,
  pais: string,
  contacto: string,
  fechaNacimiento: string,
  lugarNacimiento: string,
  premios: string
) => {
  try {
    const response = await fetch('URL DE LA API', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        foto,
        nombre,
        pais,
        contacto,
        fechaNacimiento,
        lugarNacimiento,
        premios,
      }),
    });

    if (response.ok) {
      return;
    } else {
      const errorData = await response.json();
      throw new Error(
        `Error en la respuesta del servidor: ${errorData.message}`
      );
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

export const FetchDeleteEscultor = async () => {
  try {
    // const token = Cookies.get('access_token');

    const response = await fetch('URL DE LA API', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return;
    } else {
      const errorData = await response.json();
      throw new Error(
        `Error en la respuesta del servidor: ${errorData.message}`
      );
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

const TEscultores = [
  {
    foto: 'https://www.republicadecorrientes.com/content/bucket/4/66054w695h513c.jpg.webp',
    nombre: 'Luis Bernardi',
    pais: 'Argentina',
    contacto: '3624367890',
    fechaNacimiento: '23-09-1965',
    lugarNacimiento: 'Monte Caseros, Corrientes',
    premios: [
      'Children’s Award: “Reinaldo Martinez”, Audience Award: “Juan Alberto García”, Mention “Airports Argentina”',
    ],
  },
  {
    foto: 'https://colinacultura.cl/wp-content/uploads/2021/12/photo_2021-12-09_14-20-04-768x1024.jpg',
    nombre: 'Alejandro Mardones Guillen',
    pais: 'Chile',
    contacto: '3624367890',
    fechaNacimiento: '23-09-1965',
    lugarNacimiento: 'Monte Caseros, Corrientes',
    premios: [
      'Children’s Award: “Reinaldo Martinez”, Audience Award: “Juan Alberto García”, Mention “Airports Argentina”',
    ],
  },
  {
    foto: 'https://saisho-prod-1.fra1.cdn.digitaloceanspaces.com/art/uploads/2020/04/foto-perfil-1-min.jpg',
    nombre: 'Carlos Iglesias Faura',
    pais: 'España',
    contacto: '3624367890',
    fechaNacimiento: '23-09-1965',
    lugarNacimiento: 'Monte Caseros, Corrientes',
    premios: [
      'Children’s Award: “Reinaldo Martinez”, Audience Award: “Juan Alberto García”, Mention “Airports Argentina”',
    ],
  },
  {
    foto: 'https://consideringart.com/wp-content/uploads/2023/04/top.jpg?w=800',
    nombre: 'Billy Lee',
    pais: 'Estados Unidos',
    contacto: '3624367890',
    fechaNacimiento: '23-09-1965',
    lugarNacimiento: 'Monte Caseros, Corrientes',
    premios: [
      'Children’s Award: “Reinaldo Martinez”, Audience Award: “Juan Alberto García”, Mention “Airports Argentina”',
    ],
  },
  {
    foto: 'https://d38we5ntdyxyje.cloudfront.net/834498/profile/JMJHTTKX_avatar_medium_square.jpg',
    nombre: 'Butrint Morina',
    pais: 'Kosovo',
    contacto: '3624367890',
    fechaNacimiento: '23-09-1965',
    lugarNacimiento: 'Monte Caseros, Corrientes',
    premios: [
      'Children’s Award: “Reinaldo Martinez”, Audience Award: “Juan Alberto García”, Mention “Airports Argentina”',
    ],
  },
  {
    foto: 'https://www.arte-online.net/var/arte_online_net/storage/images/arte-online/notas/bienal-del-chaco/galeria-4/tiempo-de-solveiga-vasiljeva/958457-2-esl-AR/Tiempo-de-Solveiga-Vasiljeva_obra.jpg',
    nombre: 'Solveiga Vasiljeva',
    pais: 'Letonia',
    contacto: '3624367890',
    fechaNacimiento: '23-09-1965',
    lugarNacimiento: 'Monte Caseros, Corrientes',
    premios: [
      'Children’s Award: “Reinaldo Martinez”, Audience Award: “Juan Alberto García”, Mention “Airports Argentina”',
    ],
  },
  {
    foto: 'https://riyadhart.sa/wp-content/uploads/2022/09/TS21-Anna-Korver.jpg',
    nombre: 'Anna Korver',
    pais: 'Nueva Zelanda',
    contacto: '3624367890',
    fechaNacimiento: '23-09-1965',
    lugarNacimiento: 'Monte Caseros, Corrientes',
    premios: [
      'Children’s Award: “Reinaldo Martinez”, Audience Award: “Juan Alberto García”, Mention “Airports Argentina”',
    ],
  },
  {
    foto: 'https://i0.wp.com/mediosyestrategias.com/wp-content/uploads/2024/04/55IJ5IN3UVCYPPRWMOTKNSD4B4-e1713531261804.jpg?resize=696%2C683&quality=95&ssl=1',
    nombre: 'Percy Raul Zorrilla Soto',
    pais: 'Peru',
    contacto: '3624367890',
    fechaNacimiento: '23-09-1965',
    lugarNacimiento: 'Monte Caseros, Corrientes',
    premios: [
      'Children’s Award: “Reinaldo Martinez”, Audience Award: “Juan Alberto García”, Mention “Airports Argentina”',
    ],
  },
  {
    foto: 'https://d38we5ntdyxyje.cloudfront.net/284155/profile/avatar_medium_square.jpg',
    nombre: 'Bogdan Adrian Lefter',
    pais: 'Rumania',
    contacto: '3624367890',
    fechaNacimiento: '23-09-1965',
    lugarNacimiento: 'Monte Caseros, Corrientes',
    premios: [
      'Children’s Award: “Reinaldo Martinez”, Audience Award: “Juan Alberto García”, Mention “Airports Argentina”',
    ],
  },
  {
    foto: 'https://www.sanatgezgini.com/media/avatar/cbd5de.jpg',
    nombre: 'Emrah Önal',
    pais: 'Turquia',
    contacto: '3624367890',
    fechaNacimiento: '23-09-1965',
    lugarNacimiento: 'Monte Caseros, Corrientes',
    premios: [
      'Children’s Award: “Reinaldo Martinez”, Audience Award: “Juan Alberto García”, Mention “Airports Argentina”',
    ],
  },
];
export default TEscultores;
