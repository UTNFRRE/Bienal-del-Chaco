import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import Eventos from '../../../API/Admin/Eventos';
import { useNavigate } from 'react-router-dom';

export const ProximosEventos = () => {

    const navigate = useNavigate();

    const handleCardClick = (id: number) => {
        navigate(`/public/eventos/${id}`);
    };

    return (
        <Flex  direction={"column"}>
            <Heading mb={4} mt={4}>Proximos Eventos</Heading>
                <SimpleGrid columns={3} spacing={7}>
                    {Eventos.length === 0 ? <Text>No hay eventos proximos</Text> : null}
                    {Eventos.map((evento, index) => (
                        index < 6 ? (
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
                            <Text color={"principal"} fontWeight={600} fontSize={30}>{evento.titulo}</Text>
                            <Text fontSize={17}>{evento.fecha}</Text>
                            <Text fontSize={17}>{evento.lugar}</Text>
                        </Flex> 
                        ) : null
                    ))}
                </SimpleGrid>
        </Flex>
    )
}