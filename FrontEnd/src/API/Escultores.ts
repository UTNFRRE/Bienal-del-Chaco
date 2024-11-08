const API_URL = 'https://bienalbackapi.azurewebsites.net';

//Obtenemos todos los escultores
export const getEscultores = async () => {
  try {
    const response = await fetch(`${API_URL}/Escultor/api/escultoresPublic`);
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

const Escultores = [
  {
    id: 1,
    nombre: 'Luis \nBernardi',
    pais: 'Argentina',
    bandera:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/200px-Flag_of_Argentina.svg.png',
    foto: 'https://www.republicadecorrientes.com/content/bucket/4/66054w695h513c.jpg.webp',
  },
  {
    id: 2,
    nombre: 'Alejandro \nMardones Guillen',
    pais: 'Chile',
    bandera:
      'https://eeao2nst5vu.exactdn.com/wp-content/uploads/2013/05/Bandera-chilena.jpg?strip=all&lossy=1&ssl=1',
    foto: 'https://colinacultura.cl/wp-content/uploads/2021/12/photo_2021-12-09_14-20-04-768x1024.jpg',
  },
  {
    id: 3,
    nombre: 'Carlos Iglesias \nFaura',
    pais: 'España',
    bandera:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1200px-Bandera_de_Espa%C3%B1a.svg.png',
    foto: 'https://saisho-prod-1.fra1.cdn.digitaloceanspaces.com/art/uploads/2020/04/foto-perfil-1-min.jpg',
  },
  {
    id: 4,
    nombre: 'Billy \nLee',
    pais: 'Estados Unidos',
    bandera:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/200px-Flag_of_the_United_States.svg.png',
    foto: 'https://consideringart.com/wp-content/uploads/2023/04/top.jpg?w=800',
  },
  {
    id: 5,
    nombre: 'Butrint \nMorina',
    pais: 'Kosovo',
    bandera:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Flag_of_Kosovo.svg/1200px-Flag_of_Kosovo.svg.png',
    foto: 'https://d38we5ntdyxyje.cloudfront.net/834498/profile/JMJHTTKX_avatar_medium_square.jpg',
  },
  {
    id: 6,
    nombre: 'Solveiga \nVasiljeva',
    pais: 'Letonia',
    bandera:
      'https://proyectos-derecho.ufm.edu/contemporaneos/images/f/fd/Bandera_de_Letonia.jpg',
    foto: 'https://www.arte-online.net/var/arte_online_net/storage/images/arte-online/notas/bienal-del-chaco/galeria-4/tiempo-de-solveiga-vasiljeva/958457-2-esl-AR/Tiempo-de-Solveiga-Vasiljeva_obra.jpg',
  },
  {
    id: 7,
    nombre: 'Anna \nKorver',
    pais: 'Nueva Zelanda',
    bandera:
      'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg',
    foto: 'https://riyadhart.sa/wp-content/uploads/2022/09/TS21-Anna-Korver.jpg',
  },
  {
    id: 8,
    nombre: 'Percy Raul \nZorrilla Soto',
    pais: 'Peru',
    bandera:
      'https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_Peru_%281884%E2%80%931950%29.svg',
    foto: 'https://i0.wp.com/mediosyestrategias.com/wp-content/uploads/2024/04/55IJ5IN3UVCYPPRWMOTKNSD4B4-e1713531261804.jpg?resize=696%2C683&quality=95&ssl=1',
  },
  {
    id: 9,
    nombre: 'Bogdan Adrian \nLefter',
    pais: 'Rumania',
    bandera:
      'https://upload.wikimedia.org/wikipedia/commons/7/73/Flag_of_Romania.svg',
    foto: 'https://d38we5ntdyxyje.cloudfront.net/284155/profile/avatar_medium_square.jpg',
  },
  {
    id: 10,
    nombre: 'Emrah \nÖnal',
    pais: 'Turquia',
    bandera:
      'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg',
    foto: 'https://www.sanatgezgini.com/media/avatar/cbd5de.jpg',
  },
];
export default Escultores;
