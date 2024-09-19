import { Box, Image, Container, Text, Heading , Stack, Card, CardBody, Grid, GridItem} from '@chakra-ui/react'
import Escultores from '../../../API/Escultores';
import { useNavigate } from 'react-router-dom';


function Escultoress () {
  const navigate = useNavigate(); // para poder navegar entre paginas

  const handleCardClick = (id: number) => {
    navigate(`/public/escultores/${id}`);
  };

  return (
<Container maxWidth="100vw" width="100vw" height="100vh" centerContent>
<Box
      maxWidth="100%" width="100%" 
    >
<Heading
      mr={{ base: "100px", sm: "80px", md: "80px", lg: "90px" }}
      mt={{ base: "20px", sm: "30px", md: "40px" }}
      size={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
      textAlign={"center"}
      as="h1" 
      
      fontFamily="'Mukta', serif" 
      fontWeight="600" 
      color="gray.700" 
       
      mb="4" 
    >
      Escultores Seleccionados
    </Heading>
  </Box>



<Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={10} w={"90%"} h={"100%"} justifyItems="center" alignItems="center">
  
{Escultores.map((escultor) => (
  <GridItem w="270px" h="340px" mr={"100px"}>

  <Card outline='2px solid #b4b4b8' bg="secundaryBg" w="110%" h="105%" className='my-box' borderRadius={3} sx={{
        transition: 'transform 0.3s ease', 
        '&:hover': {
          transform: 'scale(1.05)',
          cursor: 'pointer', 
        },
      }}
      >
  <CardBody h={"100%"} w={"100%"} display="flex" p={0} 
        justifyContent="center" 
        alignItems="center" 
        onClick={() => handleCardClick(escultor.id)}
        >
        <Stack h={"240px"} w={"263px"} borderRadius={3}  borderWidth={2} borderColor={"darkgray"}>
      <Image src={escultor.foto}  m={0} w={"100%"} h={"100%"} borderRadius={3}/>
      </Stack>
  </CardBody>
  
  
    <Stack mt={0} bg="white" width="100%" height="90px" maxHeight={"27%"} direction={"row"} justifyContent={"space-between"}>
      <Stack direction={"column"}>
      <Text ml={"22px"} mt={"6px"} whiteSpace="pre-line" fontSize="18px" lineHeight="1.2" 
        bg="black"
        bgClip="text"
        fontWeight="bold">{escultor.nombre}</Text>
        <Text ml={"22px"} as='i' fontSize='17px' color='black'>{escultor.pais}</Text>
      </Stack>
      <Stack width="60px" height="40px" mr={"17px"} mt={"20px"}  borderWidth={1} borderColor={"darkgray"}>
      <Image src={escultor.bandera} w={"100%"} h={"100%"} />
      </Stack>
    </Stack>
    </Card>
    </GridItem>
))}
  
</Grid>
</Container>
  )
}

export default Escultoress