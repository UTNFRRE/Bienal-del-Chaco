import {Stack, Box, Image, Input, FormLabel, Flex, Heading, FormControl, Button} from  '@chakra-ui/react';
import ImagenFondo from '../components/icons/login2.png';
import Logo from '../components/icons/pagina.png';

export default function LoginPage() {

return (

    <Box
      w="100%"
      h="100vh"
    >
    <Box
      bgImage={`url(${ImagenFondo})`}
      w="100%"
      h="100%"
      bgSize="cover"
      bgPosition="center"
      position="absolute"
      filter="contrast(120%)"
    >
    <Flex
              direction="column"
              alignItems="flex-start"
              w="100%"
              background="transparent"
              //p='48px'
              mt={{ md: '150px', lg: '80px' }}
              pl={{ base: '40px', md: '80px', lg: '160px' }}
              
            >
              <Flex alignItems="center" direction="column" mb={{ base: '10px', md: '20px' }} gap={10} w="280px"> 
                <Image src={Logo}  w="200px" h='auto' mr={{ base: '10px', md: '20px' }} mb="10%"/> 

                <Box w="100%" textAlign={"center"}>
                <Heading
                    color={"white"}
                    fontSize={{ base: '28px', md: '30px', lg: '37px' }}
                    fontWeight="500"
                    outline="none"
                    mb="8%"
                    
                >
                    Iniciar sesión
                </Heading>
                <FormControl >
                <Input
                  borderRadius="none"
                  borderTop="none"
                  borderLeft="none"
                  borderRight="none"
                  borderColor="gray"
                  fontSize="md"
                  type="name"
                  mb="15px"
                  placeholder="Usuario"
                  _placeholder={{ color: '#ffffff' }}
                  color={'white'}
                  size="lg"
                  pl="4px"
                  _focus={{
                    borderColor: '#003063',
                    boxShadow: 'none',
                  }}
                  _hover={{ borderColor: '0f183f' }}
                  // value={username}
                  // onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  borderRadius="3"
                  borderTop="none"
                  borderLeft="none"
                  borderRight="none"
                  outline="none"
                  display="block"
                  borderColor="gray"
                  fontSize="md"
                  type="password"
                  placeholder="Contraseña"
                  _placeholder={{ color: '#ffffff' }}
                  color={'white'}
                  size="lg"
                  pl="4px"
                  _focus={{
                    borderColor: '#003063',
                    boxShadow: 'none',
                  }}
                  _hover={{ borderColor: '0f183f' }}
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
                </FormControl>
                </Box>
                <Button
                  fontSize="15px"
                  type="submit"
                  bg="#3C3D37"
                  w="100%"
                  h="42"
                  mt="18%"  
                  color="white"
                  borderWidth={1}
                  borderColor="white"
                  fontWeight="500"
                  letterSpacing="1px"
                >
                  Acceder
                </Button>
              </Flex>

    </Flex>
    </Box>
    </Box>
)

}