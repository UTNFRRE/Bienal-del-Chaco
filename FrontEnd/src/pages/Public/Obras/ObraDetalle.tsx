import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Flex} from '@chakra-ui/react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const ObraDetail = () => {
  const { id } = useParams<{ id: string }>(); // Se obtiene el id de la obra de la url

  // Aca con el id se debe hacer el fecth a la api para traer la obra con todos los datos
  // Por ahora me hago un json
  const obra = 
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

  const images = obra.imagenes.map((img: string) => ({
    original: img,
    thumbnail: img,
  }));

  return (
    <Box p={0} display={"flex"} flexDirection={"row"}>
    <Box display="flex" w="70%"  flexDirection={"column"}>
      <Heading mt={5} mb={5} fontSize={"5xl"}
      >{obra.nombre}</Heading>
      <ImageGallery items={images} 
        showPlayButton={true}  // desactivo el boton de play
        autoPlay={true} //activo para que arranquen solas
        slideInterval={5000} //cada cuanto cambia, 4seg
        /> 
    </Box>  
      <Box w="30%" display="flex" flexDirection={"column"} gap={0} mt={1}>
      <Flex gap='4' alignItems='center' justifyContent={"center"} mt={8}>
          <Image src={obra.escultorImagen} boxSize="100px" borderRadius="full" />
          <Box>
            <Heading size='sm'>{obra.escultor}</Heading>
            <Text as="i">{obra.escultorPais}</Text>
          </Box>
      </Flex>
      <Box mt={6} display={"flex"} textAlign={"right"} flexDirection={"column"} marginLeft={"auto"} w={'100%'}>
          <Text as='em'>Bajo la tematica {obra.tematica}</Text>
          <Text as='em'>Creada el {obra.fechaCreacion}</Text>
          <Text textAlign={"left"} mt={6} ml={4}>{obra.descripcion}</Text>
      </Box>
      </Box>
    </Box>
  );
};

export default ObraDetail;