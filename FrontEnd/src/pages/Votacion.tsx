import { Box, Flex, Button } from '@chakra-ui/react';
import Card from '../components/Vote/Card';
import Boton from '../components/Vote/Button';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getObraById } from '../API/Admin/Obras';

interface Obra {
    esculturaId: number;
    nombre: string;
    tematica: string;
    descripcion: string;
    escultorId: number;
    fechaCreacion: string;
    esculturNombre: string;
    escultorPais: string;
    imagenes: string[];
    promedioVotos: number;
}

function Voted() {
    const { id } = useParams<{ id: string }>();
    const { userId } = useParams<{ userId: string }>();
    const [obra, setObra] = useState<Obra | null>(null);
    const [puntaje, setPuntaje] = useState<number>(0);


    useEffect(() => {
        const fetchObraById = async (id?: string) => {
            try {
                if (!id) return;
                const data = await getObraById(id);
                setObra(data);
                console.log(data);
            } catch (error) {
                console.error('Error en el fetch de la obra:', error);
            }
        };
        fetchObraById(id);
    }, [id]);

    const handlePuntajeChange = (rating: number) => {
        setPuntaje(rating);
    };

    const handlePuntuacion = () => {
        console.log("Puntaje Votacion:", puntaje);
        console.log(obra);
    };

    return (
        <Box
            w="100vh"
            h={{ base: '100vh', lg: '100vh' }}
            minHeight="100vh"
            overflow="hidden"
        >
            <Box
                bgColor={{ base: '#0B192C', lg: '#0B192C' }}
                w="100%"
                h="100%"
                bgSize="cover"
                bgPosition="center"
                position="absolute"
                filter="contrast(120%)"
                display="flex"
                alignItems={{ base: 'center', lg: 'flex-start' }}
                justifyContent={{ base: 'center', lg: 'flex-start' }}
            >
                <Flex
                    alignItems="center"
                    justify="center"
                    w="100%"
                    h="100%"
                    flexDirection="column"
                    justifyContent="space-around"
                >
                    {obra && <Card data={obra} />} {/* Renderiza Card solo si obra tiene un valor */}
                    <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection="column" width="30%" height="15%">
                        <Boton onRatingChange={handlePuntajeChange} />
                        <Button
                            p={5}
                            colorScheme='#0B192C'
                            border='2px'
                            borderColor='#CDC2A5'
                            onClick={handlePuntuacion}
                            color="#cdc2a5"
                            fontSize="1.3em"
                            sx={{
                                _hover: {
                                    transform: 'scale(1.1)',
                                    bg: '#142e51',
                                },
                                transition: 'transform 0.2s',
                            }}
                        >
                            Votar
                        </Button>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
}

export default Voted;
