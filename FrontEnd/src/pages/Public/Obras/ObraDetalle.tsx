import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Image, Flex, Button, AlertIcon } from '@chakra-ui/react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import RedesSocialesLight from '../../../components/Redes/RedesSocialesLight';
import { useEffect, useState } from 'react';
import { getObraById } from '../../../API/Admin/Obras';
import Cookies from 'js-cookie';
import ObrasRelacionadas from './ObrasRelacionadas';
import { HeadVotos } from '../../../API/Public/Votacion';
import { useAuth } from '../../../LoginContexto';
import { useEdicion } from '../../../EdicionContexto';
import { WarningIcon } from '@chakra-ui/icons';
import { GetToken } from '../../../API/Public/Votacion';

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
  const {votacionHabilitada} = useEdicion();

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

  const handleVotarClick = async () => {
    try {
     const tokenObra = await GetToken(Number(id))
     navigate(`/user/voting/${id}/${tokenObra}`);
    } catch (error) {
      console.error('Error en el fetch de la obra:', error);
    }
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
            mb={-5}
            backgroundColor="#0B192C"
            //alignItems={'center'}
            position={'relative'}
            justifyContent={'space-around'}
          >

            <Heading ml={'4%'} color={'#CDC2A5'} fontSize={'5xl'} marginRight={'auto'} mt={'3%'} fontFamily={"Jost"}>

              {obra.nombre}
            </Heading>
            <Flex position={'relative'} mt={'3%'} marginRight={'8%'}>
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
              top={"-10%"} 
              position="relative"
              zIndex={1}
              maxWidth={{ base: '100%', md: '100%', lg: '65%' }}
              width="auto" 
              height="auto"
              ml={'1%'}
            >
              <ImageGallery
                items={images}
                showPlayButton={true} // desactivo el boton de play
                autoPlay={true} //activo para que arranquen solas
                additionalClass="image-gallery"
                slideInterval={5000} //cada cuanto cambia, 4seg
                
              />
            </Box>
            <Box
              w={{ base: '100%', md: '100%', lg: '35%' }}
              display="flex"
              flexDirection={'column'}
              mt={1}
              className="Informacion"
            >
              <Flex
                  gap="4"
                  alignItems="center"
                  justifyContent="center"
                  mt={9}
                  position="relative"
                >
                  <Box
                    position="absolute"
                    left="0"
                    top="0"
                    bottom="0"
                    bgColor="azul"
                    borderTopLeftRadius="full"
                    borderBottomLeftRadius="full"
                    overflow="hidden"
                    width="calc(100% - 70px)"
                    h={'90px'}
                    ml="70px"
                  >
                  <Image
                    src={obra.escultorImagen}
                    boxSize="90px"
                    borderRadius="full"
                    borderWidth={1}
                    borderColor="azul"
                    borderStyle="solid"
                    zIndex={1}
                  />
                  </Box>
                  <Box zIndex={1} pl={'10%'} pt={'20px'}>
                    <Heading size="sm" color="beige">
                      {obra.escultorNombre}
                    </Heading>
                    <Text as="i" color="beige">
                      {obra.escultorPais}
                    </Text>
                  </Box>
                </Flex>
            <Box
              mt={'18%'}
              // mr={'6%'}
              display={'flex'}
              textAlign={'right'}
              flexDirection={'column'}
              marginLeft={'auto'}
              w={'85%'}
              fontSize={17}
              fontFamily={'Barlow'}
              p={0} // Padding para el contenido
              borderRadius="2" // Bordes redondeados
            >
              <Text as="em" color="azul" fontWeight="bold" textAlign={'left'}>
                Título: <span style={ { fontWeight: 'normal' }}>{obra.tematica}</span>
              </Text>
              <Text as="em" color="azul" fontWeight="bold" mt={3} textAlign={'left'}>
                <span style={{ fontWeight: 'normal' }}>Creada el</span>
                <span style={{ fontWeight: 'bold' }}> {obra.fechaCreacion}</span>
              </Text>
              <Text textAlign="center" color="azul" fontWeight="bold" mt={6}>
                Descripción
              </Text>
              <Text textAlign="justify" mt={2} color="azul" mb={2}>
              {obra.descripcion}
              </Text>

            </Box>
            <Flex 
              //textAlign={'right'}
              flexDirection={'column'}
              marginLeft={'18%'}
              alignItems={'center'}
              fontFamily={'Barlow'}
              fontSize={19}
              w={'80%'}
              color={'azul'}
              mt={20}>
            {isDisabled && <Flex alignItems={'center'} p={2} gap={2} bgColor={'azul'} color={'beige'} borderRadius={6}>
              <WarningIcon color={'beige'} />
              Ya has votado por esta obra
            </Flex>}

            {!votacionHabilitada && <Flex alignItems={'center'} p={2} gap={2} bgColor={'azul'} color={'beige'} borderRadius={6}>
              <WarningIcon color={'beige'} />
              La votación se encuentra cerrada
            </Flex>}
            
            { rolUser !== '' && !isDisabled && votacionHabilitada &&
              <Button w={'90%'} onClick={handleVotarClick} isDisabled={isDisabled} variant={'bienal'}>Votar</Button>
            }
            </Flex>
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
