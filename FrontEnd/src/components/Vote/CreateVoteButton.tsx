//Boton para crear una votacion
import {useState} from 'react';
import {Button, Flex, Text, useDisclosure} from '@chakra-ui/react';
import { FaVoteYea } from "react-icons/fa";
import {NotAllowedIcon} from '@chakra-ui/icons';
import { useEdicion } from '../../EdicionContexto';
import ModalConfirmar from '../Modal/ConfirmarCambios';


const CreateVoteButton = () => {
    const [hover, setHover] = useState(false);
    const {votacionHabilitada, Habilitar, Deshabilitar} = useEdicion();
    const {isOpen, onOpen, onClose} = useDisclosure();

    const handleHabilitarVotacion = () => {
        Habilitar();
     }
     
     const handleCerrarVotacion = () => {
        Deshabilitar();
     }

    return(
        <>
            <Button
                bg="#1E2A5E"
                variant="solid"
                borderRadius={3}
                p={4}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={onOpen}
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
                        {votacionHabilitada ? <NotAllowedIcon /> : <FaVoteYea size={23} />}
                    </Flex>
                    <Flex
                        transition="opacity 0.4s ease"
                        opacity={hover ? 1 : 0}
                    >
                        {votacionHabilitada ? 'Cerrar Votacion' : 'Habilitar Votacion'}
                    </Flex>
                </Button>
                <ModalConfirmar
                    isOpen={isOpen}
                    onClose={onClose}
                    confirmar={votacionHabilitada ? handleCerrarVotacion : handleHabilitarVotacion}
                    texto={votacionHabilitada ? '¿Está seguro que desea cerrar la votación?' : '¿Está seguro que desea habilitar la votación?'}
                />
        </>
        
    )
}


export default CreateVoteButton;