import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Image, Flex, Button } from '@chakra-ui/react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import RedesSocialesLight from '../../../components/Redes/RedesSocialesLight';
import { useEffect, useState } from 'react';
import { getObraById } from '../../../API/Admin/Obras';
import Cookies from 'js-cookie';
import ObrasRelacionadas from './ObrasRelacionadas';
import { HeadVotos } from '../../../API/Public/Votacion';
import { useAuth } from '../../../LoginContexto';

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
  const userId = Cookies.get('IdUser');
  const { id } = useParams<{ id: string }>();
  const [obra, setObra] = useState<Obra | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const { rolUser } = useAuth();

  useEffect(() => {
    const fetchObraById = async () => {
      if (!id) return;
      try {
        const data = await getObraById(id);
        setObra(data);
      } catch (error) {
        console.error('Error en el fetch de la obra:', error);
      }
    };
    fetchObraById();
  }, [id]);

  useEffect(() => {
    const fetchHeadVotos = async () => {
      if (!userId || !obra) return;
      try {
        const response = await HeadVotos(userId, obra.esculturaId);
        if (response.ok) {
          setIsDisabled(true); // Deshabilita el botón si la API responde con 200
        }
      } catch (error) {
        console.error('Error en la verificación de votos:', error);
      }
    };
    if (obra) {
      fetchHeadVotos();
    }
  }, [obra, userId]);

  useEffect(() => {
    if (obra) {
      const images = [
        {
          original: obra.imagenes,
          thumbnail: obra.imagenes,
        },
      ];
      setImages(images);
    }
  }, [obra]);

  const handleVotarClick = () => {
    navigate(`/user/voting/${id}/${userId}`);
  };

  return (
    <Box
    display={'flex'}
    flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
    w={'100%'}
  >
    {obra && (
      <Flex direction={'column'}
      justifyContent={'center'}
      w={'100%'}>
          <Box
            w={'100%'}
            minHeight={'33vh'} 
            display={'flex'}
            mb={2}
            backgroundColor="#0B192C"
            alignItems={'center'}
            position={'relative'}
            justifyContent={'space-around'}
          >
            <Heading ml={'7%'} color={'#CDC2A5'} fontSize={'5xl'}>
              {obra.nombre}
            </Heading>
            <Flex>
              <RedesSocialesLight />
            </Flex>
          </Box>

          <Box
            display="flex"
            justifyContent={'space-between'}
            w={{ base: '100%', md: '100%', lg: '100%' }}
            flexDirection={'row'}
          >
            <Box p={4} 
             top={"-35px"} 
             position="relative"
             zIndex={1}
             >
              <ImageGallery
                items={images}
                showPlayButton={true} // desactivo el boton de play
                autoPlay={true} //activo para que arranquen solas
                slideInterval={5000} //cada cuanto cambia, 4seg
              />
            </Box>
            <Box
              w={{ base: '100%', md: '100%', lg: '30%' }}
              display="flex"
              flexDirection={'column'}
              mt={1}
              mr={10}
              className="Informacion"
            >
            <Flex gap="4" alignItems="center" 
            justifyContent={'center'} mt={8}>
              <Image
                src={obra.escultorImagen}
                boxSize="90px"
                borderRadius="full"
                borderWidth={1}
                borderColor="azul"
                borderStyle="solid"
              />
              <Box>
                <Heading size="sm">{obra.escultorNombre}</Heading>
                <Text as="i">{obra.escultorPais}</Text>
              </Box>
            </Flex>
            <Box
              mt={6}
              display={'flex'}
              textAlign={'right'}
              flexDirection={'column'}
              marginLeft={'auto'}
              w={'100%'}
            >
              <Text as="em">Bajo la tematica {obra.tematica}</Text>
              <Text as="em">Creada el {obra.fechaCreacion}</Text>
              <Text textAlign={'left'} mt={6} ml={4}>
                {obra.descripcion}
              </Text>
              {isDisabled && <Text>Ya has votado por esta obra</Text>}
              { rolUser !== '' && !isDisabled &&
              <Button onClick={handleVotarClick} isDisabled={isDisabled}>Votar</Button>
              }
            </Box>
          </Box>
          </Box>
          <Flex direction={'column'}>
            <Flex bg={'azul'} color={'beige'} w={'100%'} textAlign={'start'}
            h={'15vh'}
            mb={4}
            alignItems={'center'}
            >
              <Text fontSize={24} ml={5} fontWeight={'bold'}>
              Obras Relacionadas
              </Text>
            </Flex> 
            <Flex>
              <ObrasRelacionadas esculturaId={obra.esculturaId} />
            </Flex>
          </Flex>
        </Flex>
        
      )}
    </Box>
  );
};

export default ObraDetail;
