import { Box, HStack, Image, Container, Text, Heading , Stack, Card, CardBody} from '@chakra-ui/react'
import Escultores from '../../../API/Escultores';


function Escultoress () {
  return (
<Container maxWidth="100vw" width="100vw" height="100vh" centerContent>
<Box
      maxWidth="100%" width="100%"
    >
<Heading
      ml="190px"
      mt="40px" as="h1" 
      size="2xl" 
      fontFamily="'Mukta', serif" 
      fontWeight="600" 
      color="gray.700" 
      textAlign="left" 
      mb="4" 
    >
      Escultores Seleccionados
    </Heading>
  </Box>
<HStack mt="10px" display="flex" flexWrap="wrap" spacing='24px' width="80%" mr="100px"  justifyContent="center" alignItems="center">
  
  
{Escultores.map((escultor) => (
  <Card outline='4px solid #c0c8d0' bg="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" w="21%" h='27%' className='my-box' sx={{
        transition: 'transform 0.3s ease', 
        '&:hover': {
          transform: 'scale(1.05)',
          cursor: 'pointer', 
        },
      }}
    >
  <CardBody h={"70%"} w={"100%"} >
      <Image src={escultor.foto} h={"100%"} w={"100%"} borderRadius='lg'/>
  </CardBody>
  
    <Stack mt={0} bg="white" width="100%" height="33%" direction={"row"} justifyContent={"space-between"}>
      <Stack direction={"column"}>
      <Text whiteSpace="pre-line" fontSize="2xl"
        bg="black"
        bgClip="text"
        fontWeight="bold">{escultor.nombre}</Text>
        <Text as='i' fontSize='20px' color='black'>{escultor.pais}</Text>
      </Stack>
      <Image src={escultor.bandera} width="60px" height="40px" />
    </Stack>
    </Card>
))}
  
</HStack>
</Container>
  )
}

export default Escultoress