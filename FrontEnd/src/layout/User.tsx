import { useRoutes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
//import { MobileNav } from '../components/NavBar/MobileNav';
//import { SidebarContent } from '../components/NavBar/Sidebarcontent';
import routes from '../routes';
import Header from '../components/Header/Header';

export default function User() {
  const userRoutes = routes.filter((route) => route.rol !== 'admin' && route.rol !== 'public' && route.rol !== 'empleado');
  const element = useRoutes(userRoutes);
  const LINK_ITEMS_ = userRoutes
    .filter((route) => route.title && route.rol && route.path)
    .map((route) => ({
      title: route.title!,
      url: route.path,
      rol: route.rol!,
    }));
  const LINK_ITEMS = LINK_ITEMS_.filter((link) => link.rol === 'user');

  return (
    <Box minH="100vh">
      <Box pos="relative" zIndex="10">
        <Header LINK_ITEMS={LINK_ITEMS} user={true} />
      </Box>
      <Box pt="20">
        {element}
      </Box>
    </Box>
  );
}
