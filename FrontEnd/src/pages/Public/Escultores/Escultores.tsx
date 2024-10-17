import { Box, Image, Container, Text, Heading , Stack, Card, CardBody, Grid, GridItem} from '@chakra-ui/react'
import getEscultor from '../../../API/Admin/Escultores';
import { useNavigate } from 'react-router-dom';


function Escultoress () {
  const navigate = useNavigate(); // para poder navegar entre paginas

  const handleCardClick = (id: number) => {
    navigate(`/public/escultores/${id}`);
  };

  return (
<Container maxWidth="100vw" width="100vw" height="100vh" centerContent>




<Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={10} w={"90%"} h={"100%"} justifyItems="center" alignItems="center" mt={6}>
  
{Escultores.map((escultor) => (
  <GridItem w="270px" h="340px" mr={"100px"}>

  <Card outline='2px solid #b4b4b8' bg="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" w="110%" h="105%" className='my-box' borderRadius={3} sx={{
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