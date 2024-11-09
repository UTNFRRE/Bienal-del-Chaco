import { Text, Box, Flex } from '@chakra-ui/react';
import CreateVoteButton from "../../components/Vote/CreateVoteButton"; //Boton para crear votacion
import QrButton from "../../components/Vote/QrButton" //Boton para generar QR

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
                    height="10vh"
                    justify="center"
                    align="center"
                    gap={4}
                >
                    <CreateVoteButton />{/* Boton para crear votacion */} 
                   <QrButton /> {/* Boton para generar QR */}
                </Flex>
                <Flex
                    justifyContent='center'
                    width='100vw'
                    flexDirection={'row'}
                    height={'75vh'}
                    >
                    <Box p={6} width={'15vw'}>
                        <h1>EDICIONES:</h1>
                        <ul>
                            {["2021", "2022", "2023"].map((year) => (
                                <>
                                    
                                    <li key={year}><a href="/"> {year}</a></li>
                                </>
                            ))}
                        </ul>
                    </Box>
                    <Box
                        bg="secundaryBg"
                        p={6}
                        w="80vw"
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