import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <Box textAlign="center" p="1rem">
      <Text fontSize="3rem">404</Text>
      <Text fontSize="2xl">Página no encontrada</Text>
      <Link to="/admin/escultores">
        <Button variant={'bienal'} size="md" mt="4">
          Ir al Inicio
        </Button>
      </Link>
    </Box>
  );
}

export default ErrorPage;