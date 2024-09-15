import { Box, HStack, Image, Container, Text, Heading , Stack, Card, CardBody, Grid, GridItem} from '@chakra-ui/react'
import Escultores from '../../../API/Escultores';


function Escultoress () {
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
  <GridItem w="250px" h="300px" mr={"100px"}>

  <Card outline='4px solid #c0c8d0' bg="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" w="110%" h="105%" className='my-box' sx={{
        transition: 'transform 0.3s ease', 
        '&:hover': {
          transform: 'scale(1.05)',
          cursor: 'pointer', 
        },
      }}>
  <CardBody h={"100%"} w={"100%"} display="flex" p={0} 
        justifyContent="center" 
        alignItems="center">
      <Image src={escultor.foto} h={"210px"} w={"253px"} borderRadius='lg' m={0}/>
  </CardBody>
  
  
    <Stack mt={0} bg="white" width="100%" height="90px" maxHeight={"27%"} direction={"row"} justifyContent={"space-between"}>
      <Stack direction={"column"}>
      <Text ml={"22px"} mt={"5px"} whiteSpace="pre-line" fontSize="18px" lineHeight="1.2" 
        bg="black"
        bgClip="text"
        fontWeight="bold">{escultor.nombre}</Text>
        <Text ml={"22px"} as='i' fontSize='17px' color='black'>{escultor.pais}</Text>
      </Stack>
      <Image src={escultor.bandera} width="60px" height="40px" mr={"11px"} mt={"5px"}/>
    </Stack>
    </Card>
    </GridItem>
))}
  
</Grid>
</Container>
  )
}

export default Escultoress