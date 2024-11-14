import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Button,
    Box, 
    Image,
    Select
} from '@chakra-ui/react';
import obras from '../../API/ObrasVote'
import {useState} from 'react';

interface QRProps {

    isOpen: boolean;

    onClose: () => void;

}

    const QR = ({isOpen,onClose}:QRProps) => {

        const [obra,setObra] = useState<number>(0);
        const [showQR, setShowQR] = useState(false);

        const handleGenerateQR = (obra: number) => {
            setShowQR(true);
            console.log(obra);
        }

        const handleCancel = () => {
            setShowQR(false);
        }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>QR</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box width="100%" >
                            <Select
                                placeholder="Selecciona una obra"
                                onChange={(e) =>setObra(Number(e.target.value))}
                            >
                                {obras.map((o) => (
                                    <option key={o.id} value={o.id}>
                                        {o.nombreObra}
                                    </option>
                                ))}
                            </Select>
                            <Button onClick={() => handleGenerateQR(obra)}>
                                Generar QR
                            </Button>
                        </Box>
                        {showQR && (
                            <Box display="flex" justifyContent="center">
                                <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png" fit="cover"/>
                            </Box>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleCancel} colorScheme='blue'>Aceptar</Button>
                        <Button onClick={onClose} colorScheme="red">Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default QR;
