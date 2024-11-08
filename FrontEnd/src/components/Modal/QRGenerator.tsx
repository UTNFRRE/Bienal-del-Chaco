import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Input, 
    Button,
    Textarea,
    Stack,
    Box, 
    FormLabel, 
    Image
} from '@chakra-ui/react';
import {useState} from 'react';

interface QRProps {

    isOpen: boolean;

    onClose: () => void;

}

const QR = ({isOpen,onClose}:QRProps) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>QR</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display="flex" justifyContent="center">
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Commons_QR_code.png" fit="cover"/>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} colorScheme="red">Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default QR;
