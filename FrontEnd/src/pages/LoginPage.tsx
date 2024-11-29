import {
  Box,
  Image,
  Input,
  Flex,
  Heading,
  FormControl,
  Button,
  Link,
  Spinner,
} from '@chakra-ui/react';
import ImagenFondo from '../components/icons/login2.png';
import Logo from '../components/icons/pagina.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../LoginContexto';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { onLogin } = useAuth();
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('');
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    // e.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(password, account); 
      showToast({
        title: 'Bienvenido',
        description: 'Inicio de sesion exitoso',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Network error', error);
      showToast({
        title: 'Error',
        description: 'Inicio de sesion fallido',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      if (account === 'admin@admin.com') {
        navigate('/admin/escultores');
      } else {
        navigate('/user/escultores');
      };
    }

  };
  return (
    <Box
      w="100vh"
      h={{ base: '100vh', lg: '100vh' }}
      minHeight="100vh"
      overflow="hidden"
    >
      <Box
        bgImage={{ base: '', lg: `url(${ImagenFondo})` }}
        bgColor={{ base: '', lg: 'transparent' }}
        //background={{base: 'linear-gradient(to bottom, black, rgba(0, 0, 0, 0.7))'}}
        w="100%"
        h="100%"
        bgSize="cover"
        bgPosition="center"
        position="absolute"
        filter="contrast(120%)"
        display="flex"
        alignItems={{ base: 'center', lg: 'flex-start' }}
        justifyContent={{ base: 'center', lg: 'flex-start' }}
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent={{ base: 'center', lg: 'flex-start' }}
          w={{ base: '100%', lg: '30%' }}
          h="100%"
          background={{ base: 'black', lg: 'rgba(255, 255, 255, 0.15)' }}
          backdropFilter={{ base: 'none', lg: 'blur(5px)' }}
          border={{ base: 'none', lg: '1px solid rgba(255, 255, 255, 0.15)' }}
          boxShadow={{ base: 'none', lg: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          p={{ base: '40px', lg: '48px' }}
          mt={{ md: '150px', lg: '2%' }}
          ml={{ base: '0px', md: '80px', lg: '120px' }}
        >
          <Flex
            alignItems="center"
            direction="column"
            mb={{ base: '10px', md: '10%' }}
            gap={20}
            w="100%"
          >
            <Box>
              <Image
                src={Logo}
                w="200px"
                h="auto"
                mr={{ base: '10px', md: '20px' }}
                mb="15%"
              />
              <Heading
                color={'white'}
                fontSize={{ base: '25px', md: '30px', lg: '37px' }}
                fontWeight="500"
                outline="none"
                textAlign={'center'}
                // mb="15%"
              >
                Iniciar sesión
              </Heading>
            </Box>

            <Box w="100%" textAlign={'center'}>
              <FormControl>
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
                  _autofill={{
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                  _hover={{ borderColor: '0f183f' }}
                  // value={username}
                  onChange={(e) => setAccount(e.target.value)}
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
                  _autofill={{
                    backgroundColor: 'black',
                    color: 'white',
                  }}
                  _hover={{ borderColor: '0f183f' }}
                  // value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </Box>
            <Box flexDirection={'column'} w={'100%'}>
            <Button
              fontSize="15px"
              type="submit"
              bg="#3C3D37"
              w="100%"
              h="42"
              color="white"
              borderWidth={1}
              borderColor="white"
              fontWeight="500"
              letterSpacing="1px"
              _hover={{ bg: '#747264' }}
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner size="sm" /> : 'Acceder'}
            </Button>
                <Box
                color="black"
                fontSize="15px"
                fontWeight="500"
                letterSpacing="1px"
                textAlign="center"
                mt="5%"
                textDecoration="underline"
                _hover={{ color: '#747264' }}
                onClick={() => navigate('/registro')}
                >
                Registrarse
                </Box>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
