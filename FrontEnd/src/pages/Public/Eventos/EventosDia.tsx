
import {Flex, Heading, Text, SimpleGrid} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEventosDia } from '../../../API/Public/EventosPu';
interface EventosDiaProps {
    id: number,
    nombre: string,
    lugar: string,
    descripcion: string,
    tematica: string,
    dia: Date | null;
    fecha: string;
};

const EventosDia: React.FC<{dia: Date | null}> = ({ dia }) => {
    const [eventos, setEventos] = useState<EventosDiaProps[]>([]); // Array de eventos
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventos = async () => {
            if (!dia) return;

            const formattedDate = dia.toISOString().split('T')[0];
            
            try {
                const eventosData = await getEventosDia(formattedDate);
                setEventos(eventosData);
            } catch (error) {
                console.error('Error al cargar los eventos:', error);
            }
        };
        fetchEventos();
    }, [dia]);

    const handleCardClick = (id: number) => {
        navigate(`/public/eventos/${id}`);
    };

    const formattedDate = dia?.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    function formatFecha(fecha: string) {
        const date = new Date(fecha);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    

    return (
        <Flex  direction={"column"}>
        <Heading mb={4} mt={4} padding={2} fontSize={25} color={'#0B192C'}>Eventos del {formattedDate}</Heading>
            <SimpleGrid columns={1} spacing={7}>
                {eventos.length === 0 ? (<Text textAlign="center" fontSize="lg">No hay eventos este dia</Text>) : (
                eventos.map((evento) => (
                    <Flex direction={"column"} key={evento.id} 
                        marginLeft={"6%"}
                        bg="linear-gradient(120deg, #b4b4b8 60%, #dfe1e6 80%)"
                        //bg={'secundary'} 
                        p={4} 
                        maxWidth={"85%"}
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
                        <Text fontWeight={600} fontSize={30} color={'#0B192C'}>{evento.nombre}</Text>
                        <Text fontSize={17}>{formatFecha(evento.fecha)}</Text>
                        <Text fontSize={17}>{evento.lugar}</Text>
                    </Flex> 
                ))
                )}
            </SimpleGrid>
        </Flex>
            )};


export default EventosDia;
