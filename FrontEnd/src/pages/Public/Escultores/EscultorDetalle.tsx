import { Grid, GridItem, CardBody, Stack, Image, Card,Flex, Divider, Heading,Text, Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import RedesSocialesLight from '../../../components/Redes/RedesSocialesLight';
import ImageGallery from 'react-image-gallery';
import '../Obras/Mansory.css';
import Masonry from 'react-masonry-css';
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
    imagenes: string;
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
        imagenes: '',
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
      <Box
      display={'flex'}
      flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
      w={'100%'}
    >
      {escultor && (
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
                {escultor.nombre} {escultor.apellido}
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
              mr={20}
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
  minH={{ base: "150px", md: "200px" }} // Ajusta la altura mínima
  border="2px solid gray" // Agrega un borde gris
  borderRadius="8px"
  mx="auto" // Centra horizontalmente
>
  <Flex justifyContent="center" width="100%">
    <Text
      as="h2"
      fontSize={{ base: "lg", md: "xl", lg: "2xl" }} // Ajusta el tamaño de la fuente
      textAlign="center"
    >
      Sobre {escultor.nombre} {escultor.apellido}
    </Text>
  </Flex>
  <Flex alignItems="center">
    <Text as="b" mr={2} fontSize={{ base: "sm", md: "md", lg: "lg" }}>País:</Text>
    <Text as="i" fontSize={{ base: "sm", md: "md", lg: "lg" }}>{escultor.pais}</Text>
  </Flex>
  <Flex alignItems="center">
    <Text as="b" mr={2} fontSize={{ base: "sm", md: "md", lg: "lg" }}>Premios:</Text>
    <Text as="i" fontSize={{ base: "sm", md: "md", lg: "lg" }}>{escultor.premios}</Text>
  </Flex>
  <Flex alignItems="center">
    <Text as="b" mr={2} fontSize={{ base: "sm", md: "md", lg: "lg" }}>Lugar de Nacimiento:</Text>
    <Text as="i" fontSize={{ base: "sm", md: "md", lg: "lg" }}>{escultor.lugarNacimiento}</Text>
  </Flex>
  <Flex alignItems="center">
    <Text as="b" mr={2} fontSize={{ base: "sm", md: "md", lg: "lg" }}>Biografía:</Text>
    <Text as="i" fontSize={{ base: "sm", md: "md", lg: "lg" }}>{escultor.biografia}</Text>
  </Flex>
</Stack>






            </Flex>
            <Box
              mt={6}
              display={'flex'}
              textAlign={'right'}
              flexDirection={'column'}
              marginLeft={'auto'}
              w={'100%'}
            >
              {/*
              <Text as="em">Bajo la tematica {obra.tematica}</Text>
              <Text as="em">Creada el {obra.fechaCreacion}</Text>
              <Text textAlign={'left'} mt={6} ml={4}>
                {obra.descripcion}
              </Text>
              */}
            </Box>
          </Box>
          </Box>
          <Flex direction="column">
  {/* Header */}
  <Flex
    bg="azul"
    color="beige"
    w="100%"
    textAlign="start"
    h={{ base: "10vh", md: "15vh" }} // Ajusta la altura según el tamaño de pantalla
    mb={4}
    alignItems="center"
  >
    <Text
      fontSize={{ base: "18px", md: "24px", lg: "28px" }} // Escalado de texto
      ml={5}
      fontWeight="bold"
    >
      Obras
    </Text>
  </Flex>

  {/* Grid Container */}
  <Flex
    flexWrap="wrap" // Permite que los elementos se ajusten automáticamente
    justifyContent="center" // Centra los elementos
    maxW="100%"
    w="100%"
    gap={{ base: "16px", md: "24px" }} // Espaciado entre las tarjetas
  >
    {obra.map((o) => (
      <GridItem
      key={o.id}
      p={4}
      w={{ base: "100%", sm: "45%", md: "30%", lg: "25%" }}
      h="auto"
    >
      <Card
        outline="2px solid #b4b4b8"
        bg="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
        w="100%"
        h="350px" // Altura fija para todos los cards
        className="my-box"
        borderRadius={3}
        sx={{
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
            cursor: "pointer",
          },
        }}
      >
        {/* Image Section */}
        <CardBody
          h="70%" // Ocupa un 70% del alto total
          w="100%"
          display="flex"
          p={0}
          justifyContent="center"
          alignItems="center"
          onClick={() => handleCardClick(o.id)}
        >
            <Stack
            h="100%"
            w="100%"
            borderRadius={3}
            borderWidth={2}
            borderColor="darkgray"
            >
            <Image
              src={o.imagenes.split(',')[1]}
              w="100%"
              h="100%"
              objectFit="cover" // Mantiene la proporción
              borderRadius={3}
            />
            </Stack>
        </CardBody>
    
        {/* Text Section */}
        <Stack
          mt={0}
          bg="white"
          width="100%"
          height="30%" // Ocupa el 30% del alto total
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <Stack direction="column">
            <Text
              ml="22px"
              mt="5px"
              whiteSpace="pre-line"
              fontSize={{ base: "14px", md: "18px" }}
              lineHeight="1.2"
              bg="black"
              bgClip="text"
              fontWeight="bold"
              noOfLines={1} // Trunca el texto si es demasiado largo
            >
              {o.nombre}
            </Text>
            <Text
              ml="22px"
              as="i"
              fontSize={{ base: "12px", md: "16px" }}
              color="black"
              noOfLines={2} // Trunca el texto en la descripción
            >
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


{/*
  
  <Grid w={"100%"} h={"100vh"} templateColumns={"1fr 1fr"} templateRows={"1fr 1fr"} border={"3px solid black"} >
            <GridItem backgroundColor={"lightyellow"}>
                <Box display="flex" alignItems="center" w={"100%"} h={"100%"}>
     
                    <Box w={"45%"} h={"60%"}> 
                        <Image src={escultor.foto} h={"100%"} w={"100%"}/>
                    </Box>
    
                    <Box w={"45%"} h={"60%"} p={8}> 
                        <Text>{escultor.nombre}</Text>
                        <Text>{escultor.apellido}</Text>
                        <Text>{escultor.dni}</Text>
                        <Text>{escultor.pais}</Text>
                        <Text>{escultor.telefono}</Text>
                        <Text>{escultor.biografia}</Text>
                    </Box>

                 </Box>
  </GridItem>
              
            

            
       {obra.map((o) => {
                return (
                  <React.Fragment key={o.id}> 
            <GridItem backgroundColor={"lightblue"} colSpan={2} display="flex" alignItems="center" justifyContent={"center"}>  
              <Box display="flex" alignItems="center" w={"100%"} h={"100%"}>

              <Box w={"45%"} h={"60%"} p={8}> 
                <Image src={o.imagenes} h={"100%"} w={"100%"}/>
              </Box>


              <Box w={"45%"} h={"60%"} pl={2} pt={8}> 
                <Text>{o.nombre}</Text>
                <Text>{o.descripcion}</Text>
              </Box>

                </Box>
            </GridItem>
            
            </React.Fragment>
                )
          })}
          



        </Grid>

  
  */}