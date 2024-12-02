import React from 'react';
import {
  Box,
  Image,
  Input,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import Logo from '../components/icons/pagina.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { AddUser } from '../API/Login';

export default function Registro() {
    const navigate = useNavigate();
    const toast = useToast();
  
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [birthDate, setBirthDate] = useState('');
  
    const handleRegister = () => {
      // Verificar que todos los campos estén completos
      if (!username || !email || !password || !repeatPassword || !fullName || !birthDate) {
        toast({
          title: 'Error',
          description: 'Por favor, complete todos los campos requeridos.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
  
      // Verificar que las contraseñas coincidan
      if (password !== repeatPassword) {
        toast({
          title: 'Error',
          description: 'Las contraseñas no coinciden.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
  
      const register = async () => {
          const response = await AddUser(fullName, username, email, password, birthDate);
          if (response) {
          toast({
            title: 'Registro exitoso',
            description: 'Usuario registrado correctamente.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          navigate('/auth/');
        } else  {
          toast({
            title: 'Error',
            description: 'Error al registrar el usuario.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        };
      };
      register();
    };

  return (
    <Box
      w="100%"
      h="100vh"
      minHeight="100vh"
      overflow="hidden"
      bgGradient="linear(to-r, black, gray.800)"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        h="100%"
        p={4}
      >
        <Image src={Logo} alt="Logo" mb={2} w={'200px'} h={'auto'} />
        <Heading color="white" mb={6} fontSize={34} fontFamily={'serif'}>Registro</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="80%">
          <FormControl id="username" isRequired>
            <FormLabel color="white">Nombre de usuario</FormLabel>
            <Input
              type="text"
              color={'white'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel color="white">Correo electrónico</FormLabel>
            <Input
              type="email"
              color={'white'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel color="white">Contraseña</FormLabel>
            <Input
              type="password"
             
              color={'white'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="repeatPassword" isRequired>
            <FormLabel color="white">Repetir contraseña</FormLabel>
            <Input
              type="password"
              
              color={'white'}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="fullName" isRequired>
            <FormLabel color="white">Nombre completo</FormLabel>
            <Input
              type="text"
              
              color={'white'}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </FormControl>
          <FormControl id="birthDate" isRequired>
            <FormLabel color="white">Fecha de nacimiento</FormLabel>
            <Input
              type="date"
              color={'white'}
              
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </FormControl>
        </SimpleGrid>
        <Button
              fontSize="15px"
              type="submit"
              mt={8}
              bg="#3C3D37"
              w="20%"
              h="42"
              color="white"
              borderWidth={1}
              borderColor="white"
              fontWeight="500"
              letterSpacing="1px"
              onClick={handleRegister}
              _hover={{ bg: '#747264' }}
            >
              Registrarse
            </Button>
      </Flex>
    </Box>
  );
}