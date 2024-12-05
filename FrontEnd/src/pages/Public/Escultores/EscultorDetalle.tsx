import { GridItem, CardBody, Stack, Image, Card,Flex, Heading,Text, Box} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RedesSocialesLight from '../../../components/Redes/RedesSocialesLight';
import ImageGallery from 'react-image-gallery';
import '../Obras/Mansory.css';
import { useNavigate } from 'react-router-dom';

import { getEscultorById } from '../../../API/Admin/Escultores';
import { getObraByEscultor } from '../../../API/Admin/Obras';

interface Escultor {
    id: number;
    nombre: string;
    apellido:string;
    dni:string;
    pais: string;
    telefono:string
    fechaNacimiento: string;
    lugarNacimiento:string;
    premios: string;
    biografia:string;
    foto:string;
  }

  interface Obra {
    id:number;
    nombre: string;
    descripcion: string;
    imagenes: string[];
  }


const EscultorDetail = () => {
    const [images, setImages] = useState<any[]>([]);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [obra, setObra] = useState<Obra[]>([
      {
        id:0,
        nombre: '',
        descripcion: '',
        imagenes: [''],
      }
    ]);
    const [escultor, setEscultor] = useState<Escultor>({
        id:  0,
        nombre:  '',
        apellido:  '',
        dni: '',
        pais:  '',
        telefono: '',
        fechaNacimiento: '',
        lugarNacimiento:'',
        premios: '',
        biografia:  '',
        foto: '',
      });

      useEffect (() => {
        const fetchEscultorById = async (id?: string) => {
        try {
          if (!id) return;
          const data = await getEscultorById(id);
          setEscultor(data);
          const data2 = await getObraByEscultor(id);
          setObra(data2);
          console.log(data2)
        }
        catch (error) {
          console.error('Error en el fetch de la obra:', error);
        }
      }
      fetchEscultorById(id);
      }, [id]);

      const handleCardClick = (id: number) => {
        navigate(`/public/obras/${id}`);
    };

      useEffect(() => {
        if (escultor) {
          const images = [
            {
              original: escultor.foto,
              thumbnail: escultor.foto,
            },
          ];
          setImages(images);
        }
      }, [obra]);

return (
  <Box p={{ base: 0, md: 0 }}>
    {escultor && (
      <Flex direction="column" w="100%">
        <Box
          w="100%"
          minHeight="33vh"
          display="flex"
          mb={2}
          backgroundColor="#0B192C"
          alignItems="center"
          position="relative"
          justifyContent="space-between"
        >
          <Heading  ml={{ base: '4%', md: '7%' }} mr={{ base: '4%', md: '7%' }} color="#CDC2A5" fontSize={{ base: '3xl', md: '5xl' }} >
            {escultor.nombre}
          </Heading>
          <Flex mr={{ base: '4%', md: '7%' }}>
            <RedesSocialesLight />
          </Flex>
        </Box>
        <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} w="100%">
          <Box p={{ base: 2, md: 4 }}  top={{ base: '-20px', md: '-45px' }} position="relative" zIndex={1} w={{ base: '100%', md: '70%' }}>
            <ImageGallery items={images} showPlayButton={true} autoPlay={true} slideInterval={5000} />
          </Box>
          <Box mb={{ base: 4, md: 8 }} w={{ base: '100%', md: '30%' }} display="flex" flexDirection="column" mt={{ base: 0, md: 0 }} mr={{ base: 0, md: 20 }} className="Informacion">
            <Flex gap="4" alignItems="center" width="100%" justifyContent="center" mt={8} mr={4}>
              <Stack
                mt={2}
                bg="#FAF5FF"
                maxW={{ base: '95%', md: '80%', lg: '100%' }}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                flex={1}
                spacing={4}
                p={{ base: 2, md: 4 }}
                ml={0}
                minH={{ base: '150px', md: '200px' }}
                border="2px solid gray"
                borderRadius="4px"
                mx="auto"
                backgroundColor={'#F3EFF0'}
              >
                <Flex justifyContent="center" width="100%">
                  <Text as="h2" fontSize={{ base: 'lg', md: 'xl', lg: '2xl' }} textAlign="center">
                    Sobre {escultor.nombre}
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <Text as="b" mr={2} fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
                    País:
                  </Text>
                  <Text as="i" fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
                    {escultor.pais}
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <Text as="b" mr={2} fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
                    Premios:
                  </Text>
                  <Text as="i" fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
                    {escultor.premios}
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <Text as="b" mr={2} fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
                    Lugar de Nacimiento:
                  </Text>
                  <Text as="i" fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
                    {escultor.lugarNacimiento}
                  </Text>
                </Flex>
                <Flex alignItems="center">
                  <Text as="b" mr={2} fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
                    Biografía:
                  </Text>
                  <Text as="i" fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}>
                    {escultor.biografia}
                  </Text>
                </Flex>
              </Stack>
            </Flex>
          </Box>
        </Box>
        <Flex direction="column">
          {/* Header */}
          <Flex bg="azul" color="beige" w="100%" textAlign="start" h={{ base: '10vh', md: '15vh' }} mb={4} alignItems="center">
            <Text fontSize={{ base: '18px', md: '24px', lg: '28px' }} ml={5} fontWeight="bold">
              Obras
            </Text>
          </Flex>

          {/* Grid Container */}
          <Flex flexWrap="wrap" justifyContent="center" maxW="100%" w="100%" gap={{ base: '16px', md: '24px' }}>
            {obra.map((o) => (
              <GridItem key={o.id} p={4} w={{ base: '100%', sm: '45%', md: '30%', lg: '25%' }} h="auto">
                <Card
                  outline="2px solid #b4b4b8"
                  bg="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
                  w="100%"
                  h="350px"
                  className="my-box"
                  borderRadius={3}
                  sx={{
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      cursor: 'pointer',
                    },
                  }}
                >
                  {/* Image Section */}
                  <CardBody h="70%" w="100%" display="flex" p={0} justifyContent="center" alignItems="center" onClick={() => handleCardClick(o.id)}>
                    <Stack h="100%" w="100%" borderRadius={3} borderWidth={2} borderColor="darkgray">
                      <Image src={o.imagenes[0]} w="100%" h="100%" objectFit="cover" borderRadius={3} />
                    </Stack>
                  </CardBody>

                  {/* Text Section */}
                  <Stack mt={0} bg="white" width="100%" height="30%" direction="row" justifyContent="space-between" alignItems="center" p={2}>
                    <Stack direction="column">
                      <Text ml="22px" mt="5px" whiteSpace="pre-line" fontSize={{ base: '14px', md: '18px' }} lineHeight="1.2" bg="black" bgClip="text" fontWeight="bold" noOfLines={1}>
                        {o.nombre}
                      </Text>
                      <Text ml="22px" as="i" fontSize={{ base: '12px', md: '16px' }} color="black" noOfLines={2}>
                        {o.descripcion}
                      </Text>
                    </Stack>
                  </Stack>
                </Card>
              </GridItem>
            ))}
          </Flex>
        </Flex>
      </Flex>
    )}
  </Box>
);
};

export default EscultorDetail;
