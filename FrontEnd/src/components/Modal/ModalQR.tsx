import React, { useEffect } from 'react';
import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalBody, 
    ModalCloseButton, 
    Text
} from '@chakra-ui/react';
import QrCodeGenerator from '../Obras/GenerarQR';
import { GetToken } from '../../API/Public/Votacion';

interface Obra {
    esculturaId: string;
    nombre: string;
    tematica: string;
    descripcion: string;
    fechaCreacion: string;
    escultorNombre: string;
    escultorPais: string;
    escultorImagen: string;
    imagenes: string;
  }

interface QRProps {

    isOpen: boolean;

    onClose: () => void;

    obra:Obra | null;
    
}


const ModalQR: React.FC<QRProps> = ({isOpen,onClose, obra}) => {
    const [urlcodigo, setUrlCodigo] = React.useState<string>(''); 

    useEffect(() => {
        const obtenerToken = async (esculturaId: number) => {
        try {
          const data = await GetToken(esculturaId);
          const token = data.token;
          const url = `${window.location.origin}/voting/${esculturaId}/${token}`;
          setUrlCodigo(url);
        } catch (error) {
          console.error('Error en el fetch de obras:', error);
        }
        };
        
        if(obra){
            obtenerToken(parseInt(obra.esculturaId));
        }

        const intervalId = setInterval(() => {
            if (obra) {
                obtenerToken(parseInt(obra.esculturaId));
            }
        }, 60000); // 60000 ms = 1 min
    
        return () => clearInterval(intervalId);
    }, [obra, isOpen]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>QR para {obra?.nombre}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                       <QrCodeGenerator urlcodigo={urlcodigo} />
                       <Text> La url es: {urlcodigo} </Text>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModalQR;