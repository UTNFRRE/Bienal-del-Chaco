import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
//import Eventos from '../../../API/Admin/Eventos';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEventos } from '../../../API/Public/EventosPu';

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

    // Cargar los eventos al montar el componente
    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const eventosData = await getEventos(); // Obtener eventos desde la API
                setEventos(eventosData);
            } catch (error) {
                console.error('Error al cargar los eventos:', error);
            }
        };
        fetchEventos();
    }, []);

    //const navigate = useNavigate();

    const handleCardClick = (id: number) => {
        navigate(`/public/eventos/${id}`);
    };

    return (
        <Flex  direction={"column"}>
            <Heading mb={4} mt={4}>Proximos Eventos</Heading>
                <SimpleGrid columns={3} spacing={7}>
                    {eventos.length === 0 ? <Text>No hay eventos proximos</Text> : null}
                    {eventos.map((evento, index) => (
                        index < 9 ? (
                        <Flex direction={"column"} key={evento.id} 
                            bg={'secundary'} 
                            p={4} 
                            borderRadius={3} 
                            borderWidth={1} borderColor={'secundaryHover'}
                            sx={{
                                transition: 'transform 0.3s ease', 
                                '&:hover': {
                                transform: 'scale(1.05)',
                                cursor: 'pointer', 
                                },
                            }}
                            onClick={() => handleCardClick(evento.id)}>
                            <Text color={"principal"} fontWeight={600} fontSize={30}>{evento.nombre}</Text>
                            <Text fontSize={17}>{evento.fecha}</Text>
                            <Text fontSize={17}>{evento.lugar}</Text>
                        </Flex> 
                        ) : null
                    ))}
                </SimpleGrid>
        </Flex>
    )
}