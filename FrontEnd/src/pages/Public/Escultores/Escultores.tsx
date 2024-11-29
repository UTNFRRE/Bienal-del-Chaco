import {
  Box,
  Image,
  Container,
  Text,
  //Heading,
  Stack,
  Card,
  CardBody,
  SimpleGrid,
  Heading,
  //Grid,
  GridItem,
  IconButton,
  Flex,
  //Center,
} from '@chakra-ui/react';
import { getEscultores } from '../../../API/Escultores';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEdicion } from '../../../EdicionContexto';
import { useAuth } from '../../../LoginContexto';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

interface Escultor {
  id: number;
  nombre: string;
  pais: string;
  foto: string;
}
/*
const json: Escultor[] = [
  {
      id:1,
      nombre: "Juan",
      pais: "Argentina",
      foto: "https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Foto-Luis-Bernardi.png"
  }];*/

function Escultoress () {

  const navigate = useNavigate(); 
  const { edicion } = useEdicion();
  const { rolUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Cantidad de obras por página
  const [totalPages, setTotalPages] = useState(2);

  const handleCardClick = (id: number) => {
    if (rolUser !== '') {
      navigate(`/user/escultores/${id}`);
    } else {
    navigate(`/public/escultores/${id}`);
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const [Escultores, setEscultores] = useState<Escultor[]>([]);
  
    useEffect(() => {
      const fetchEscultores = async () => {
        try {
          const data = await getEscultores(edicion);
          console.log(data);
          setEscultores(data);
        } catch (error) {
          console.error('Error en el fetch de Escultores:', error);
        }
      };
    
      fetchEscultores();
    }, [currentPage, pageSize, edicion]);


return (
    <Container maxWidth="100vw" width="100vw" height="100vh" centerContent 
    paddingY="%5" 
    paddingX="2%" 
    mx="auto"
    paddingLeft={"7%"}
    >
    <Box 
    width="110%"
    height="40%"
    bg="#0B192C"
    display="flex"
    position="relative"
    zIndex={-5} // Esto asegura que esté detrás de los escultores
    paddingX="5vw" // Añade un espacio en los lados para que no toque los bordes
    left="-3vw"
    top="0" 
    >
    <Heading as="h1" size="xl" color={'#CDC2A5'} fontSize={45}  
    mb={0} mt={8}
    >
      Escultores
    </Heading>
    </Box>
    <Box 
    width="110%"
    height="50%"
    bg="#0B192C"
    //display="flex"
    position="relative"
    zIndex={-5} // Esto asegura que esté detrás de los escultores
    paddingX="5vw" // Añade un espacio en los lados para que no toque los bordes
    left="-3vw"
    top="0" 
    >
    <Heading as="h1" size="xl" color={'#0B192C'} fontSize={45} 
    // alignSelf="flex-start" ml="1%" 
    mb={0} mt={10}
    >
      Escultores
    </Heading>
    </Box>
      <SimpleGrid
        w='100%'
        h='100%'
        justifyItems="center" 
        mt={20}
        columns={[1, 2, 3, 4]}
        //spacing={10}
        position="relative"
        zIndex={5} // Para que esté sobre la caja azul
        top="-20%" // Ajusta este valor para superponer las tarjetas más arriba de la caja azul

      >
        {Escultores.map((escultor) => (
          <GridItem key={escultor.id} //w="100%" h="100%" 
          w="270px" h="340px" mr={'100px'}>
            <Card
              outline="2px solid #b4b4b8"
              bg="linear-gradient(135deg, #a1b3cf 50%, #172d4a 90%)"
              w="90%"
              h="90%"
              className="my-box"
              borderRadius={6}
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  cursor: 'pointer',
                },
              }}
            >
              <Stack
                h='80%'
                w='100%'
                display="flex"
                borderColor="#b4b4b8"
                onClick={() => handleCardClick(escultor.id)}  // Mueve el onClick al Stack
                >
                <Image
                  src={escultor.foto}
                  m={0}
                  w="100%"
                  h="100%"
                />
              </Stack>
              <Stack
                mt={0}
                bg="white"
                width="100%"

                height="100%" // Ajusta el alto de la sección de texto al 30%
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                flex={1}
                //maxHeight={'27%'}
                 onClick={() => handleCardClick(escultor.id)}>
   
                <Stack direction="column" ml="5%" spacing={0}>

                  <Text
                    whiteSpace="pre-line"
                    fontSize="18px"
                    lineHeight="1.2"
                    bg="black"
                    bgClip="text"
                    fontWeight="bold"
                    //fontFamily={'Times New Roman'}
                    as={'kbd'}
                  >
                    {escultor.nombre}
                  </Text>
                  <Text as="i" fontSize="17px" color="black">
                    {escultor.pais}
                  </Text>
                </Stack>
              </Stack>
            </Card>
          </GridItem>
        ))}
      </SimpleGrid>
      {/* <Box w={'100%'} mr={20}>
        <Flex justifyContent="flex-end" mt={4} gap={1}>
          <IconButton
            aria-label="Previous Page"
            icon={<ArrowLeftIcon />}
            variant="bienal"
            borderRadius={3}
            onClick={() => handlePreviousPage()}
            isDisabled={currentPage === 1}
          />
          <IconButton
            aria-label="Next Page"
            icon={<ArrowRightIcon />}
            variant="bienal"
            borderRadius={3}
            onClick={() => handleNextPage()}
            isDisabled={currentPage === totalPages}
          />
        </Flex>
      </Box> */}
    </Container>
  );}

export default Escultoress;
