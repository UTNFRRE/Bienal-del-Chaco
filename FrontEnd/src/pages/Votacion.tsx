import imagenFondo from '../components/icons/login2.png';
import {Box, Image, Input, Flex, Heading, FormControl, Button} from  '@chakra-ui/react';
import Card from '../components/Vote/Card';
import Boton from '../components/Vote/Button';


function Voted (){
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
                    <Boton />
                </Flex> 

            </Box>
        </Box>
    )
}

export default Voted;