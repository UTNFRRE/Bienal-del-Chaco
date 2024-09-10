import { Box, HStack, Image, Container, Text, Heading , Stack} from '@chakra-ui/react'
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
      fontFamily="'Playfair Display', serif" 
      fontWeight="bold" 
      color="gray.800" 
      textAlign="left" 
      mb="4" 
    >
      Selected Sculptors
    </Heading>
  </Box>
<HStack mt="10px" display="flex" flexWrap="wrap" spacing='24px' width="80%" mr="100px"  justifyContent="center" alignItems="center">
  
  
{Escultores.map((escultor) => (
  <Stack w="27%" h='27%' className='my-box' sx={{
        transition: 'transform 0.3s ease', 
        '&:hover': {
          transform: 'scale(1.1)',
          cursor: 'pointer', 
        },
      }}
    >

    <Image src={escultor.foto} height="300px"/>
    <Stack bg="white" width="100%" height="33%" direction={"row"} justifyContent={"space-between"}>
      <Stack direction={"column"}>
      <Text whiteSpace="pre-line" fontSize="2xl"
        bg="black"
        bgClip="text"
        fontWeight="bold">{escultor.nombre}</Text>
        <Text as='i' fontSize='20px' color='black'>{escultor.pais}</Text>
      </Stack>
      <Image src={escultor.bandera} width="60px" height="40px" />
    </Stack>
    </Stack>
))}
  
</HStack>
</Container>
  )
}

export default Escultoress