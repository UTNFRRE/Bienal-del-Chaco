// api/obras. Metodo GET, POST, PUT, PATCH, DELETE
// para el metodo post/put/patch en el campo escultor va el id del escultor
const Obras = [
    {
        id: 1,
        nombre: "Obra 1",
        tematica: "Tematica 1",
        descripcion: "Descripcion de la obra 1",
        escultor: "Escultor 1",
        imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
    },
    {
        id: 2,
        nombre: "Obra 2",
        tematica: "Tematica 2",
        descripcion: "Descripcion de la obra 2",
        escultor: "Escultor 2",
        imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
    },
    {
        id: 3,
        nombre: "Obra 3",
        tematica: "Tematica 3",
        descripcion: "Descripcion de la obra 3",
        escultor: "Escultor 3",
        imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
    },
    {
        id: 4,
        nombre: "Obra 4",
        tematica: "Tematica 4",
        descripcion: "Descripcion de la obra 4",
        escultor: "Escultor 4",
        imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
    },
    {
        id: 5,
        nombre: "Obra 5",
        tematica: "Tematica 5",
        descripcion: "Descripcion de la obra 5",
        escultor: "Escultor 5",
        imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
    },
    {
        id: 6,
        nombre: "Obra 6",
        tematica: "Tematica 6",
        descripcion: "Descripcion de la obra 6",
        escultor: "Escultor 6",
        imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
    },
    {
        id: 7,
        nombre: "Obra 7",
        tematica: "Tematica 7",
        descripcion: "Descripcion de la obra 7",
        escultor: "Escultor 7",
        imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
    },
    {
        id: 8,
        nombre: "Obra 8",
        tematica: "Tematica 8",
        descripcion: "Descripcion de la obra 8",
        escultor: "Escultor 8",
        imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
    },
    {
        id: 9,
        nombre: "Obra 9",
        tematica: "Tematica 9",
        descripcion: "Descripcion de la obra 9",
        escultor: "Escultor 9",
        imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
    },
    {
        id: 10,
        nombre: "Obra 10",
        tematica: "Tematica 10",
        descripcion: "Descripcion de la obra 10",
        escultor: "Escultor 10",
        imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
    },
    {
        id: 11,
        nombre: "Obra 11",
        tematica: "Tematica 11",
        descripcion: "Descripcion de la obra 11",
        escultor: "Escultor 11",
        imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
    }
]

//api/obras/:id. Metodo GET
const obraa = 
{
  id: 1,
  nombre: "Umbral IV",
  tematica: "Tematica de la obra 1",
  descripcion: "Descripcion de la obra 1111111",
  fechaCreacion: "2021-07-01",
  escultor: "Martin Lopez Soto",
  escultorPais: "Argentina",
  escultorImagen : "https://www.republicadecorrientes.com/content/bucket/4/66054w695h513c.jpg.webp",
  imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
};
