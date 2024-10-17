import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Flex, IconButton, ButtonGroup} from '@chakra-ui/react';
import ImageGallery from 'react-image-gallery';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import 'react-image-gallery/styles/css/image-gallery.css';
import RedesSociales from '../../../components/Redes/RedesSociales';
import { useEffect, useState } from 'react';

import { getObraById } from '../../../API/Admin/Obras';

interface Obra {
  esculturaId: number;
  nombre: string;
  tematica: string | null;
  descripcion: string;
  fechaCreacion: string;
  escultorNombre: string;
  escultorPais: string;
  escultorImagen: string;
  imagenes: string;
}

const ObraDetail = () => {
  const { id } = useParams<{ id: string }>(); // Se obtiene el id de la obra de la url
  const [images, setImages] = useState<any[]>([]);
  const [obra, setObra] = useState<Obra>({
    esculturaId: 0,
    nombre: '',
    tematica: '',
    descripcion: '',
    fechaCreacion: '',
    escultorNombre: '',
    escultorPais: '',
    escultorImagen: '',
    imagenes: '',
  });

  // Aca con el id se debe hacer el fecth a la api para traer la obra con todos los datos
  // Por ahora me hago un json
  useEffect (() => {
    const fetchObraById = async (id?: string) => {
    try {
      if (!id) return;
      const data = await getObraById(id);
      setObra(data);
      console.log(data);
    }
    catch (error) {
      console.error('Error en el fetch de la obra:', error);
    }
  }
  fetchObraById(id);
  }, [id]);
  
  useEffect(() => {
    if (obra) {
      const images = [{
        original: obra.imagenes,
        thumbnail: obra.imagenes,
      }];
      setImages(images);
    }
  }, [obra]);
  return (
    <Box p={0} display={"flex"} flexDirection={{base: 'column' , md:'row', lg:'row'}}>
      {obra && (
        <>
      <Box display="flex" w={{ base: '100%', md:'100%', lg: '70%' }}  flexDirection={"column"} className='Galeria'>
        <Heading mt={5} mb={5} fontSize={"5xl"}
        >{obra.nombre}</Heading>
        <Box borderWidth={2} borderColor={'secundaryHover'} p={2}>
        <ImageGallery items={images} 
          showPlayButton={true}  // desactivo el boton de play
          autoPlay={true} //activo para que arranquen solas
          slideInterval={5000} //cada cuanto cambia, 4seg
          /> 
        </Box>
      </Box>  
      <Box w={{ base: '100%', md:'100%', lg: '30%' }}  display="flex" flexDirection={"column"} gap={0} mt={1} className='Informacion'>
          <Flex gap='4' alignItems='center' justifyContent={"center"} mt={8}>
              <Image src={obra.escultorImagen} boxSize="90px" borderRadius="full" borderWidth={2} borderColor="secundaryHover" borderStyle="solid"/>
              <Box>
                <Heading size='sm'>{obra.escultorNombre}</Heading>
                <Text as="i">{obra.escultorPais}</Text>
              </Box>
          </Flex>
          <Flex justifyContent={"center"} mt={6}>
            <RedesSociales/>
          </Flex>
          <Box mt={6} display={"flex"} textAlign={"right"} flexDirection={"column"} marginLeft={"auto"} w={'100%'}>
              <Text as='em'>Bajo la tematica {obra.tematica}</Text>
              <Text as='em'>Creada el {obra.fechaCreacion}</Text>
              <Text textAlign={"left"} mt={6} ml={4}>{obra.descripcion}</Text>
          </Box>
        </Box>
        </>
      )}
    </Box>
  );
};

export default ObraDetail;