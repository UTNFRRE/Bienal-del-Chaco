import { useRoutes } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import routes from '../routes';
import Header from '../components/Header/Header';

export default function Admin() {
  const adminRoutes = routes.filter((route) => route.rol !== 'public');
  const element = useRoutes(adminRoutes);
  const LINK_ITEMS_ = adminRoutes
    .filter((route) => route.title && route.rol && route.path)
    .map((route) => ({
      title: route.title!,
      url: route.path,
      rol: route.rol!,
    }));
  const LINK_ITEMS = LINK_ITEMS_.filter((link) => link.rol === 'admin');

  return (
    <Box w="100%">
      <Box pos="relative" zIndex="10">
        <Header LINK_ITEMS={LINK_ITEMS} user={true} />
      </Box>
      <Box pt="20" ml="7px">
        {element}
        
      </Box>
    </Box>
  );
}
