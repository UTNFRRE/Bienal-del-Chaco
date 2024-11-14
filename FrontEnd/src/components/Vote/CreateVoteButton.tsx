//Boton para crear una votacion
import {useState} from 'react';
import {Button, Flex, Text} from '@chakra-ui/react';
import { VscAdd } from "react-icons/vsc";


const CreateVoteButton = () => {
    const [hover, setHover] = useState(false);

    return(
        
            <Button
                bg="#1E2A5E"
                variant="solid"
                borderRadius={3}
                p={4}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                transition="all 0.3s ease"
                display="flex"
                alignItems="center"
                justifyContent="center"
                _hover={{ bg: "#2b345b" }}
                    >
                    <Flex
                        transition="opacity 0.4s ease"
                        opacity={hover ? 0 : 1}
                        position="absolute"
                    >
                        <VscAdd />
                    </Flex>
                    <Flex
                        transition="opacity 0.4s ease"
                        opacity={hover ? 1 : 0}
                    >
                        <Text>Crear Votacion</Text>
                    </Flex>
                </Button>
        
    )
}


export default CreateVoteButton;