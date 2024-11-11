import imagenFondo from '../components/icons/login2.png';
import {Box,Flex, Button} from  '@chakra-ui/react';
import Card from '../components/Vote/Card';
import Boton from '../components/Vote/Button';
import {useState} from 'react';


function Voted (){

    const [puntaje,setPuntaje] = useState<Number | null >(0);

    const handlePuntajeChange = (rating: Number) => {
        setPuntaje(rating);
    }

    const handlePuntuacion = ()=>{
        console.log("Puntaje Votacion:" + puntaje);
        window.location.reload();//Simulo que reinicio todo pq se envio el input
    }

    return (
        <Box
            w="100vh"
            h={{ base: '100vh', lg: '100vh' }}
            minHeight="100vh"
            overflow="hidden"
        >
            <Box
                bgImage={{base: '', lg: `url(${imagenFondo})`}}
                bgColor={{base: '', lg: 'transparent'}}
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
                        <Button colorScheme='blue' onClick={handlePuntuacion}>Votar</Button>
                    </Box>
                </Flex> 

            </Box>
        </Box>
    )
}

export default Voted;