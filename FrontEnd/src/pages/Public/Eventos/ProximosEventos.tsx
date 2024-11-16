import { Flex, Heading, SimpleGrid, Text, Box } from '@chakra-ui/react';
//import Eventos from '../../../API/Admin/Eventos';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProximosEventos } from '../../../API/Public/EventosPu';
import { useEdicion } from '../../../EdicionContexto';
import { useAuth } from '../../../LoginContexto';

interface Evento {
    id: number,
    nombre: string,
    fecha: string,
    lugar: string,
    descripcion: string,
    tematica: string,
}

export const ProximosEventos = () => {
  const [eventos, setEventos] = useState<Evento[]>([]); // Array de eventos
  const navigate = useNavigate();
  const {edicion} = useEdicion();
  const {rolUser} = useAuth();

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const eventosData = await getProximosEventos(edicion); // Obtener eventos desde la API
                setEventos(eventosData);
            } catch (error) {
                console.error('Error al cargar los eventos:', error);
            }
        };
        fetchEventos();
    }, [edicion]);


  const handleCardClick = (id: number) => {
    if (rolUser !== '') {
    navigate(`/user/eventos/${id}`);
    } else {
    navigate(`/public/eventos/${id}`);
    }
  };

  function formatFecha(fecha: string) {
    const date = new Date(fecha);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <Flex direction={'column'} ml={10}>
      <Box 
      width="110%"
      height="100%"
      bg="#0B192C"
      display="flex"
      position="relative"
      zIndex={-5} // Esto asegura que esté detrás de los escultores
      paddingX="5vw" // Añade un espacio en los lados para que no toque los bordes
      left="-5vw"
      >
      <Heading mb={4} mt={6} color={'#CDC2A5'}>
        Proximos Eventos
      </Heading>
      
      </Box>
      <Box 
      width="110%"
      height="100%"
      bg="#0B192C"
      display="flex"
      position="relative"
      zIndex={-5} // Esto asegura que esté detrás de los escultores
      paddingX="5vw" // Añade un espacio en los lados para que no toque los bordes
      left="-5vw"
      top="0" 
      >
        <Heading mb={4} mt={4} color={'#0B192C'}>
          hhhh
        </Heading>
      </Box>
      <SimpleGrid columns={3} spacing={7}>
        {eventos.length === 0 ? <Text top="-150%" color={'#CDC2A5'} position="relative">No hay eventos proximos</Text> : null}
        {eventos.map((evento, index) =>
          index < 9 ? (
            <Flex
              direction={'column'}
              marginLeft={'0%'}
              zIndex={5}
              position="relative"
              top="-35%" // Ajusta el valor para mover los eventos hacia arriba
              key={evento.id}
              //bg={'secundary'}
              bg="linear-gradient(120deg, #b4b4b8 60%, #dfe1e6 80%)"
              p={4}
              maxWidth={'95%'}
              borderRadius={3}
              borderWidth={1}
              borderColor={'secundaryHover'}
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => handleCardClick(evento.id)}
            >
              <Text color={'#0B192C'} fontWeight={600} fontSize={30}>
                {evento.nombre}
              </Text>
              <Text fontSize={17}>{formatFecha(evento.fecha)}</Text>
              <Text fontSize={17}>{evento.lugar}</Text>
            </Flex>
          ) : null
        )}
      </SimpleGrid>
    </Flex>
  );
};
