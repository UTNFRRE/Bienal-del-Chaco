import { Box, Flex, Button } from '@chakra-ui/react';
import Card from '../components/Vote/Card';
import Boton from '../components/Vote/Button';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getObraById } from '../API/Admin/Obras';
import { addVoto } from '../API/Public/Votacion';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface Obra {
    esculturaId: number;
    nombre: string;
    tematica: string;
    descripcion: string;
    escultorId: number;
    fechaCreacion: string;
    esculturNombre: string;
    escultorPais: string;
    imagenes: string;
    promedioVotos: number;
}

function Voted() {
    const { id } = useParams<{ id: string }>();
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [obra, setObra] = useState<Obra | null>(null);
    const [puntaje, setPuntaje] = useState<number>(0);
    const toast = useToast();

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

    const handlePuntuacion = async () => {
        if ( !obra?.esculturaId || puntaje === 0) {
            return; 
        }

        try {
            await addVoto(obra.esculturaId, puntaje);
            toast({
                title: 'Exito',
                description: 'Voto registrado correctamente',
                status: 'success',
                duration: 5000,
                isClosable: true,});
            console.log("Voto registrado correctamente");
        } catch (error) {
            console.error('Error en el envío de la votación:', error);
            toast({
                title: 'Error',
                description: 'Error al registrar el voto, ya ha votado por esta obra',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        navigate('/user/obras');
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
                    {obra && <Card data={obra} />}
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
                            isDisabled={puntaje === 0 || !obra}
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
