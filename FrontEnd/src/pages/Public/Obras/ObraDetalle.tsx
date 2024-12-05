import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, Text, Image, Flex, Button, AlertIcon, Stack } from '@chakra-ui/react';
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

type Imagen = {
  url: string;
  id: number;
  esculturaId: number;
};
interface Obra {
  esculturaId: number;
  nombre: string;
  tematica: string | null;
  descripcion: string;
  fechaCreacion: string;
  escultorNombre: string;
  escultorPais: string;
  escultorImagen: string;
  imagenes: Imagen[];
  promedioVotos: number;
}


const ObraDetail = () => {
 
  const { id } = useParams<{ id: string }>();
  const userId = Cookies.get('IdUser');
  const [isDisabled, setIsDisabled] = useState(false);
  const [obra, setObra] = useState<Obra | null>(null);
  const [images, setImages] = useState<any[]>([]);
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
    if (obra) {
      const images = obra.imagenes.map((imagen) => ({
        original: imagen.url,
        thumbnail: imagen.url,
      }));
      setImages(images);
    }
  }, [obra]);

  useEffect(() => {
    const fetchHeadVotos = async () => {
      if (!userId || !obra) return;
      try {
        const response = await HeadVotos(userId, obra.esculturaId);
        if (response.ok) {
          setIsDisabled(true); 
        }
      } catch (error) {
        console.error('Error en la verificación de votos:', error);
      }
    };
    if (obra) {
      fetchHeadVotos();
    }
  }, [obra, userId]);

  const handleVotarClick = async () => {
    try {
     const tokenObra = await GetToken(Number(id))
     navigate(`/user/voting/${id}/${tokenObra.token}`);
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
            minHeight={'25vh'} 
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
              top={"-15px"} 
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
             

                
                <Box
              w={{ base: '100%', md: '100%', lg: '80%' }}
              display="flex"
              flexDirection={'column'}
              mt={1}
              ml={20}
              className="Informacion"
            >
                <Flex gap="4" alignItems="center" width="100%"
            justifyContent={'center'} mt={8}  mr = {4}>
              
              <Stack
  mt={2}
  bg="#FAF5FF"
  maxW={{ base: "95%", md: "80%", lg: "100%" }} // Ajusta el ancho en diferentes tamaños de pantalla
  direction="column"
  justifyContent="flex-start"
  alignItems="flex-start" // Mantiene el contenido alineado a la izquierda
  flex={1}
  spacing={4}
  p={{ base: 2, md: 4 }} // Ajusta el padding para pantallas más pequeñas
  ml={0}
  minH={{ base: "50px", md: "50px" }} // Ajusta la altura mínima
  border="2px solid gray" // Agrega un borde gris
  borderRadius="8px"
  mx="auto" // Centra horizontalmente
>
  <Flex
    gap={{ base: 6, md: 4 }} // Espaciado entre imagen y texto
    alignItems="center"
    justifyContent="flex-start" // Alinea el contenido a la izquierda
    mt={0} // Elimina el margen superior del Flex
    width="90%" // Ancho del contenedor responsivo
    maxWidth="1100px" // Límite máximo de ancho
    mx="auto" // Centrado horizontal
    p={{ base: 2, md: 4 }} // Padding interno para evitar bordes ajustados
    bg="azulClaro" // Fondo opcional para visualizar el contenedor
    borderRadius="lg" // Bordes redondeados para un diseño más limpio
  >
    <Image
      src={obra.escultorImagen}
      boxSize={{ base: "70px", md: "90px" }} // Tamaño de imagen responsivo
      borderRadius="full"
      borderWidth={1}
      borderColor="azul"
      borderStyle="solid"
    />
    <Box>
      <Heading size={{ base: "xs", md: "sm" }} color="black">
        {obra.escultorNombre}
      </Heading>
      <Text as="i" fontSize={{ base: "xs", md: "sm" }} color="black">
        {obra.escultorPais}
      </Text>
    </Box>
  </Flex>

  <Flex alignItems="center" mt={0}> {/* Margen superior eliminado */}
    <Text as="b" mr={2} fontSize={{ base: "sm", md: "md", lg: "lg" }}>Temática:</Text>
    <Text as="i" fontSize={{ base: "sm", md: "md", lg: "lg" }}>{obra.tematica}</Text>
  </Flex>
  <Flex alignItems="center" mt={0}> {/* Margen superior eliminado */}
    <Text as="b" mr={2} fontSize={{ base: "sm", md: "md", lg: "lg" }}>Fecha de Creación:</Text>
    <Text as="i" fontSize={{ base: "sm", md: "md", lg: "lg" }}>{obra.fechaCreacion}</Text>
  </Flex>
</Stack>


            </Flex>
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
            {isDisabled && rolUser !== '' && <Flex alignItems={'center'} p={2} gap={2} bgColor={'azul'} color={'beige'} borderRadius={6}>
              <WarningIcon color={'beige'} />
              Ya has votado por esta obra
            </Flex>}

            {!votacionHabilitada && rolUser !== '' && <Flex mt={2} alignItems={'center'} p={2} gap={2} bgColor={'azul'} color={'beige'} borderRadius={6}>
              <WarningIcon color={'beige'} />
              La votación se encuentra cerrada
            </Flex>}
            
            { rolUser !== '' && !isDisabled && votacionHabilitada &&
              <Flex mt={2} alignItems={'center'} p={2} gap={2} bgColor={'azul'} color={'beige'} borderRadius={6}>
              <WarningIcon color={'beige'} />
             Escanea el QR para votar
            </Flex>
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
