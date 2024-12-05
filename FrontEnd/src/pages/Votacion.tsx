import { Box, Flex, Button, Heading , Image} from '@chakra-ui/react';
import Card from '../components/Vote/Card';
import Boton from '../components/Vote/Button';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getObraById } from '../API/Admin/Obras';
import { addVoto } from '../API/Public/Votacion';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEdicion } from '../EdicionContexto';
import { InfoIcon } from '@chakra-ui/icons';
import { TokenValido } from '../API/Public/Votacion';
import imgLogo from '../components/icons/pagina.png';
import { HeadVotos } from '../API/Public/Votacion';
import Cookies from 'js-cookie';

type Imagen = {
    url: string;
    id: number;
    esculturaId: number;
  };
  interface Obra {
    esculturaId: number;
    nombre: string;
    tematica: string | null;
    descripcion: string;
    fechaCreacion: string;
    escultorNombre: string;
    escultorPais: string;
    escultorImagen: string;
    imagenes: Imagen[];
    promedioVotos: number;
}

function Voted() {
    const { id } = useParams<{ id: string }>();
    const userId = Cookies.get('IdUser');
    const [isDisabled, setIsDisabled] = useState(false);
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [obra, setObra] = useState<Obra | null>(null);
    const [puntaje, setPuntaje] = useState<number>(0);
    const toast = useToast();
    const {votacionHabilitada} = useEdicion();
    const [tokenValido, setTokenValido] = useState<boolean>(false);

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

        const fetchTokenValido = async (token: string, esculturaId: number) => {
            try {
                const data = await TokenValido(token, esculturaId);
                setTokenValido(data);
            } catch (error) {
                console.error('Error en el fetch de la obra:', error);
            }
        };

        if (id && token) {
        fetchTokenValido(token, parseInt(id));
        }

        console.log('id', id)
        console.log('token', token)

    }, [id]);

    useEffect(() => {
        const fetchHeadVotos = async () => {
          if (!userId || !obra) return;
          try {
            const response = await HeadVotos(userId, obra.esculturaId);
            if (response.ok) {
              setIsDisabled(true); 
            }
          } catch (error) {
            console.error('Error en la verificación de votos:', error);
          }
        };
        if (obra) {
          fetchHeadVotos();
        }
      }, [obra, userId]);

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

    return tokenValido && !isDisabled && votacionHabilitada ? (
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
                            isDisabled={puntaje === 0 || !obra || !votacionHabilitada}
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
    ) :  (
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
            flexDirection={'column'}
            color={'beige'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Image
                src={imgLogo}
                w="150px"
            ></Image>
            <Heading>
            {!tokenValido && 
                'Url No Valida'
            }
            </Heading>
            <Heading>
            {isDisabled && 
                'Ya has votado por esta obra'
            }
            </Heading>
            <Heading>
            {!votacionHabilitada && 
                'La votación se encuentra cerrada'
            }
            </Heading>
        </Box>
        </Box>
    );
}

export default Voted;
