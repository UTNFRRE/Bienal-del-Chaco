import {Text, Box, Image, Input, Flex, Heading, FormControl, Button,} from  '@chakra-ui/react';
import {useState} from 'react';
import { VscAdd } from "react-icons/vsc";
import { BsQrCode } from "react-icons/bs";

const ManagerVotes = () => {
    const [hover, setHover] = useState(false);

    return (
            <Flex
                width="100vw"
                height="20vh"
                justify="center"
                align="center"
                gap={5}
            >
                <Button
                colorScheme="blue"
                variant="solid"
                width="14vw"
                height='8vh'
                p={4}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                transition="all 0.3s ease"
                display="flex"
                alignItems="center"
                justifyContent="center">
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
                <Button
                colorScheme="blue"
                variant="solid"
                width="14vw"
                height='8vh'
                p={4}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                transition="all 0.3s ease"
                display="flex"
                alignItems="center"
                justifyContent="center">
                    <Flex
                        transition="opacity 0.4s ease"
                        opacity={hover ? 0 : 1}
                        position="absolute"
                    >
                        <BsQrCode />
                    </Flex>
                    <Flex
                        transition="opacity 0.4s ease"
                        opacity={hover ? 1 : 0}
                    >
                        <Text>Generar QR</Text>
                    </Flex>
                </Button>
            </Flex>
    );
}

export default ManagerVotes;