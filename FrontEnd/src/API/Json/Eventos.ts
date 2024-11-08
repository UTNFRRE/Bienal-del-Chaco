// api/eventos. Metodo GET, POST, PUT, DELETE, PATCH
const Eventos = [
  {
    id: 1,
    titulo: 'Evento 1',
    fecha: '2021-08-01',
    descripcion: 'Descrpcion del evento 1',
    lugar: 'Av las heras 812',
    tematica: 'River',
    latitud: -27.46371294429546,
    longitud: -58.986895228835934,
  },
  {
    id: 2,
    titulo: 'Evento 2',
    fecha: '2021-08-01',
    descripcion: 'Descrpcion del evento 2',
    lugar: 'Av las heras 812',
    tematica: 'River',
    latitud: -27.451087831382576,
    longitud: -58.97901544828362,
  },
];

// api/eventos/proximos. Metodo GET
// hay que definir hasta cuantos eventos se quieren mostrar.
const Eventoss = [
  {
    id: 1,
    titulo: 'Evento 1',
    fecha: '2021-08-01',
    lugar: 'Av las heras 812',
    tematica: 'River',
  },
  {
    id: 2,
    titulo: 'Evento 2',
    fecha: '2021-08-01',
    lugar: 'Av las heras 812',
    tematica: 'River',
  },
];

// api/eventos/:dia. Metodo GET
const s = [
  {
    id: 1,
    titulo: 'Evento 1',
    fecha: '2021-08-01',
    lugar: 'Av las heras 812',
    tematica: 'River',
  },
  {
    id: 2,
    titulo: 'Evento 2',
    fecha: '2021-08-01',
    lugar: 'Av las heras 812',
    tematica: 'River',
  },
];

// api/eventos/:id. Metodo GET
const evento = {
  id: 1,
  titulo: 'Evento 1',
  fecha: '2021-08-01',
  descripcion: 'Descrpcion del evento 1',
  lugar: 'Av las heras 812',
  tematica: 'River',
  latitud: -27.46371294429546,
  longitud: -58.986895228835934,
};
