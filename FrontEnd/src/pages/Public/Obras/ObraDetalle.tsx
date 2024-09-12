import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image } from '@chakra-ui/react';

const ObraDetail = () => {
  const { id } = useParams<{ id: string }>(); // Se obtiene el id de la obra de la url

  // Aca con el id se debe hacer el fecth a la api para traer la obra con todos los datos
  // Por ahora me hago un json
  const obra = 
  {
    id: 1,
    nombre: "Obra 1",
    tematica: "Tematica 1",
    descripcion: "Descripcion de la obra 1",
    fechaCreacion: "2021-07-01",
    distinciones: [ "Distincion 1", "Distincion 2" ],
    escultor: "Escultor 1",
    escultorImagen : "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg",
    imagenes: [ "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3784.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_3174.jpg", "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/07/Monge_1612.jpg" ],
  };

  return (
    <Box p={4}>
      <Heading>{obra.nombre}</Heading>
      <Text>{obra.tematica}</Text>
      <Text>{obra.descripcion}</Text>
      <Text>{obra.escultor}</Text>
      <Box mt={4}>
        {obra.imagenes.map((img, index) => (
          <Image key={index} src={img} alt={`Imagen ${index + 1}`} mb={2} />
        ))}
      </Box>
    </Box>
  );
};

export default ObraDetail;