import {
    Flex,
    Image,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
    Button,
    IconButton,
    Spacer,
    
  } from '@chakra-ui/react';
  import imgLogo from '../icons/pagina.png';
  import logoUser from '../icons/logo-user.png';
  import { FiMenu } from 'react-icons/fi';
  import {NavContent} from '../NavBar/NavContent';
  import MovileNav from '../NavBar/MobileNav';
  
  
  export function HeaderContent({ onOpen }: { onOpen: any }) {
    return (
      <Flex
        as="header"
        borderBottom="1px"
        borderColor="gray.300"
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
          <Flex gap={19}  alignItems="center" flex={{ base: 1, md: 0 }}>
            <Flex mt="3px" display={{ base: 'none', md: 'block' }}>
              <NavContent/> 
            </Flex>
            <Flex
              display={{ base: 'flex', md: 'none' }}
            >
              <MovileNav/>
            </Flex>
            <Spacer display={{ base: 'flex', md: 'none' }} />
            <Menu>
              <MenuButton as={Button} borderRadius="50%" w="50px" h="50px" p="0px">
                <Image src={logoUser} w="100%"></Image>
              </MenuButton>
              <MenuList>
                <MenuItem color="gray" pointerEvents="none">
                  Ver Perfil
                </MenuItem>
                <MenuItem>Cerrar sesión</MenuItem>
              </MenuList>
          </Menu>
        </Flex>
      </Flex>
    );
  }