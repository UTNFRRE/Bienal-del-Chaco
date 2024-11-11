import {
  Flex,
  Image,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Button,
  Spacer,
  Avatar,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import imgLogo from '../icons/pagina.png';
import { NavContent } from '../NavBar/NavContent';
import MovileNav from '../NavBar/MobileNav';
import {useNavigate} from 'react-router-dom';
import { getEdiciones } from '../../API/Ediciones';
import { useEffect, useState } from 'react';
import { useEdicion } from '../../EdicionContexto';

interface NavContentProps {
  LINK_ITEMS: { title: string; url: string; rol: string }[];
  user: boolean;
}

export function HeaderContent({ LINK_ITEMS, user }: NavContentProps) {

  const navigate = useNavigate();
  const { edicion, setEdicion } = useEdicion();
  const [ediciones, setEdiciones] = useState<any[]>([]);
  const handleButton = () => {
    navigate('/auth/');
  }
  useEffect(() => {
      const getEdicionesData = async () => {
        const data = await getEdiciones();
        setEdiciones(data);
      }
      getEdicionesData();
  }, []);

  return (
    <Flex
      as="header"
      borderBottom="1px"
      w="100%"
      pos="fixed"
      pl="30px"
      pr="30px"
      justifyContent="space-between"
      textAlign="center"
      h="80px"
      background="linear-gradient(to right, #000000, #434343)"
      alignItems="center"
    >
      <Image
        src={imgLogo}
        w="150px"
        display={{ base: 'none', md: 'flex' }}
      ></Image>
      <Flex gap={19} alignItems="center" flex={{ base: 1, md: 0 }}>
        <Flex
          flexDirection="row"
          justifyContent="center"
          display={{ base: 'none', md: 'block' }}
        >
          <NavContent LINK_ITEMS={LINK_ITEMS} />
        </Flex>
        <Flex display={{ base: 'flex', md: 'none' }}>
          <MovileNav LINK_ITEMS={LINK_ITEMS} />
        </Flex>
        <Spacer display={{ base: 'flex', md: 'none' }} />
        <Flex alignItems={'center'} mt={'1%'}>
        <Menu>
            <MenuButton as={Button} colorScheme={'white'} border="1px" borderColor="white">
             {edicion}
            </MenuButton>
            <MenuList>
            <MenuOptionGroup defaultValue='2024' type='radio'
              onChange={(value) => setEdicion(Array.isArray(value) ? value[0] : value)}>
              {ediciones.map((edicionn) => (
                <MenuItemOption key={edicionn.año} value={edicionn.año.toString()}>{edicionn.año.toString()}</MenuItemOption>
              ))}
            </MenuOptionGroup>
            </MenuList>
        </Menu>
        </Flex>
        {user && (
          <Menu>
            <MenuButton
              as={Button}
              borderRadius="50%"
              w="50px"
              h="50px"
              p="0px"
            >
              <Avatar name="Yoel Marain" />
            </MenuButton>
            <MenuList>
              <MenuItem color="gray" pointerEvents="none">
                Ver Perfil
              </MenuItem>
              <MenuItem>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        )}
        {!user && (
          <Button
            bg="transparent"
            color="white"
            mt={'1%'}
            border="1px"
            borderColor="white"
            _hover={{ bg: 'white', color: 'black' }}
            _active={{ bg: 'white', color: 'black' }}
            onClick={handleButton}
          >
            Iniciar sesión
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
