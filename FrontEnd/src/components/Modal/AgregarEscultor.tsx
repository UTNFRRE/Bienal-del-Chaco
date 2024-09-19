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
    Stack,
    Box, 
    FormLabel, 
    FormControl 
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ZonaCargaEscultor from '../ZonaCarga/ZonaCargaEscultor';
interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    confirmar: (fotoPreview: string, nombre: string, pais: string, contacto: string) => void;
}

export default function ModalAgregarEscultor({ isOpen, onClose, confirmar }: ModalComponentProps) {
    const [foto, setFoto] = useState<string | null>(null);
    const [nombre, setNombre] = useState('');
    const [pais, setPais] = useState('');
    const [contacto, setContacto] = useState('');

    const handleFotoChange = (fotoData: string) => {
        setFoto(fotoData);
    };

    // Función para manejar la confirmación
    const handleConfirmar = () => {
        confirmar(foto || '', nombre, pais, contacto);
        onClose();
    };

    const isFormValid = () => {
        return nombre.trim() !== '' && pais.trim() !== '' && contacto.trim() !== '';
    };

    useEffect(() => {
        setNombre('');
        setPais('');
        setContacto('');
        setFoto(null);
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="700px">
                <ModalHeader>Agregar Escultor</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired>
                        <Stack gap={7}>
                            <Stack direction="row" gap={5} w="100%">
                                <Box>
                                    <FormLabel mb={0}>Nombre</FormLabel>
                                    <Input
                                        placeholder=""
                                        size="md"
                                        variant="Unstyled"
                                        width={500}
                                        borderWidth={1}
                                        flex={1}
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </Box>
                            </Stack>
                            <Stack direction="row" gap={5} w="100%">
                                <Box>
                                    <FormLabel mb={0}>Pais</FormLabel>
                                    <Input
                                        placeholder=""
                                        size="md"
                                        variant="Unstyled"
                                        borderWidth={1}
                                        width={315}
                                        flex={1}
                                        value={pais}
                                        onChange={(e) => setPais(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel mb={0}>Contacto</FormLabel>
                                    <Input
                                        placeholder=""
                                        size="md"
                                        variant="Unstyled"
                                        width={315}
                                        borderWidth={1}
                                        flex={1}
                                        value={contacto}
                                        onChange={(e) => setContacto(e.target.value)}
                                    />
                                </Box>
                            </Stack>
                            <ZonaCargaEscultor maxFiles={1} handleFotoChange={handleFotoChange} filesUpload={[]}/>  {/* Limita a 1 una foto */}
                        </Stack>
                    </FormControl>
                </ModalBody>
                <ModalFooter mt={6}>
                    <Button
                        variant={'bienal'}
                        mr={3}
                        onClick={handleConfirmar}
                        size="sm"
                        isDisabled={!isFormValid()}
                    >
                        Agregar
                    </Button>
                    <Button
                        mr={3}
                        onClick={onClose}
                        variant="light"
                        size="sm"
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
