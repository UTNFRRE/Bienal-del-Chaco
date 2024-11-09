import { Text, Box, Flex } from '@chakra-ui/react';
import CreateVoteButton from "../../components/Vote/CreateVoteButton"; //Boton para crear votacion
import QrButton from "../../components/Vote/QrButton" //Boton para generar QR

import EdicionesMenu from '../../components/Vote/EdicionesMenu';

const ManagerVotes = () => {
    

    return (
        <>
            <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <Flex
                    width="100vw"
                    height='10vh'
                    justifyContent='space-between'>
                    <Box position='absolute' zIndex={1} display="flex"  width="10vw" top='13%'justifyContent="center" alignItems="center"  ml={{ base: 2, md: 4 }} >
                        <EdicionesMenu />
                    </Box>  
                    <Flex
                        zIndex={0}
                        width="100vw"
                        height="100%"
                        justify="center"
                        align="center"
                        gap={4}
                    >
                        
                        <CreateVoteButton />{/* Boton para crear votacion */} 
                        <QrButton /> {/* Boton para generar QR */}
                    </Flex>
                </Flex>
                <Flex
                    justifyContent='center'
                    width='100vw'
                    flexDirection={'row'}
                    height={'75vh'}
                    >
                    <Box
                        bg="secundaryBg"
                        p={6}
                        w="95vw"
                        borderWidth={1}
                        borderColor={"secundaryHover"}
                    >
                        <Text>Tabla de Votaciones</Text>
                    </Box>
                </Flex>
            </Flex>
            
        </>
    );
}

export default ManagerVotes;