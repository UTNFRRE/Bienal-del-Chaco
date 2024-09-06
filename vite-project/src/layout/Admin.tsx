import { useRoutes } from 'react-router-dom';
import { Box, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
//import { MobileNav } from '../components/NavBar/MobileNav';
//import { SidebarContent } from '../components/NavBar/Sidebarcontent';
import routes from '../routes';

import Header from '../components/Header/Header';

export default function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const element = useRoutes(routes);

  return (
    <Box minH="100vh">
      <Box pos="relative" zIndex="10">
        <Header onOpen={onOpen} />
      </Box>
      <Box p="10" pt="20">
        {element}
      </Box>
    </Box>
  );
}