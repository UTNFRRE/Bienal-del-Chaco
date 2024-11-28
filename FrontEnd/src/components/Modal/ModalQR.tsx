import React from 'react';
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
import QrCodeGenerator from '../Obras/GenerarQR';


interface QRProps {

    isOpen: boolean;

    onClose: () => void;

    urlcodigo: string;

    obra:string;
    
}


const ModalQR: React.FC<QRProps> = ({isOpen,onClose, urlcodigo, obra}) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>QR para {obra}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                       <QrCodeGenerator urlcodigo={urlcodigo} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalQR;