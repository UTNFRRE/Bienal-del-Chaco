import { Text, Flex, Button,useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import QR from "../Modal/QRGenerator";
import { BsQrCode } from "react-icons/bs";

interface Obras {
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

interface QrProps {
    data: Obras[];
}

const QrButton: React.FC <QrProps> = ({data}) => {

    const { 
        isOpen: isOpenQr, 
        onOpen: onOpenQr, 
        onClose: onCloseQr 
    } = useDisclosure();


    const [hover1, setHover1] = useState(false);

    return(
        <>
             <Button
                        bg="#1E2A5E"
                        variant="solid"
                        borderRadius={3}
                        p={4}
                        onMouseEnter={() => setHover1(true)}
                        onMouseLeave={() => setHover1(false)}
                        transition="all 0.3s ease"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        _hover={{ bg: "#2b345b" }}
                        onClick={onOpenQr}
                    >
                        <Flex
                            transition="opacity 0.4s ease"
                            opacity={hover1 ? 0 : 1}
                            position="absolute"
                        >
                            <BsQrCode />
                        </Flex>
                        <Flex
                            transition="opacity 0.4s ease"
                            opacity={hover1 ? 1 : 0}
                        >
                            <Text>Generar QR</Text>
                        </Flex>
                    </Button>
                    <QR 
                    isOpen={isOpenQr} 
                    onClose={onCloseQr}
                    data={data} />
        </>
    )
}


export default QrButton;