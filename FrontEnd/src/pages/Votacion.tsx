import {Box,Flex, Button} from  '@chakra-ui/react';
import Card from '../components/Vote/Card';
import Boton from '../components/Vote/Button';
import {useState} from 'react';


interface Obra {
    esculturaId: number,
    nombre: string,
    tematica: string,
    descripcion: string,
    escultorId: number,
    fechaCreacion: string,
    esculturNombre: string,
    escultorPais: string,
    imagenes: string[],
    promedioVotos: number
}


function Voted (){

    const [puntaje,setPuntaje] = useState<Number | null >(0);

    const handlePuntajeChange = (rating: Number) => {
        setPuntaje(rating); //rating   
    }

    const handlePuntuacion = ()=>{
        console.log("Puntaje Votacion:" + puntaje);
       // window.location.reload();//Simulo que reinicio todo pq se envio el input
    }


    return (
        <Box
            w="100vh"
            h={{ base: '100vh', lg: '100vh' }}
            minHeight="100vh"
            overflow="hidden"
        >
            <Box
                bgColor={{base: '#0B192C', lg: '#0B192C'}}
                //background={{base: 'linear-gradient(to bottom, black, rgba(0, 0, 0, 0.7))'}}
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
                    <Card />
                    <Box display="flex" alignItems="center" justifyContent="space-between"  flexDirection="column" width="30%" height="15%" >
                        <Boton onRatingChange={handlePuntajeChange} />
                        <Button 
                            p={5}
                            colorScheme='#0B192C' 
                            border='2px' 
                            borderColor='#CDC2A5' 
                            onClick={handlePuntuacion}
                            color="#cdc2a5"
                            fontSize= "1.3em"
                            sx={{
                                _hover: {
                                    transform: 'scale(1.1)',
                                    bg: '#142e51', // Cambia el colorScheme al hacer hover
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
    )
}

export default Voted;