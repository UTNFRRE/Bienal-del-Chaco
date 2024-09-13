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
    Text,
    Flex,
    Box,
    FormLabel,
    FormControl,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiOutlinePhotograph } from "react-icons/hi";

interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    confirmar: (fotoPreview: string, nombre: string, pais: string, contacto: string) => void;
}

export default function ModalAgregarEscultor({ isOpen, onClose, confirmar }: ModalComponentProps) {
    const [foto, setFoto] = useState<string | null>(null);
    const [nombreArchivo, setNombreArchivo] = useState<string>('');
    const [nombre, setNombre] = useState('');
    const [pais, setPais] = useState('');
    const [contacto, setContacto] = useState('');
    
    const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            // Convertir a base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setFoto(reader.result as string);  // Guardar la cadena base64
            };
            reader.readAsDataURL(selectedFile);
            
            setNombreArchivo(selectedFile.name);  // Guardar el nombre del archivo
        } else {
            setFoto(null);
            setNombreArchivo('');
        }
    };

    const handleconfirmar = () => {
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
                            <Box>
                                <Button
                                    mt={4}
                                    width="650px" 
                                    height="100px" 
                                    colorScheme="teal"
                                    color="white"
                                    fontSize={18}
                                    rightIcon={<HiOutlinePhotograph style={{ height: '26px', width: '26px' }} />}
                                    onClick={() => document.getElementById('fileInput')?.click()}
                                >
                                    Foto 
                                </Button>
                                <Input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={handleFotoChange}
                                />
                                {foto && (
                                    <Stack direction="column">
                                        <Text fontWeight="bold" mt={6}>Archivo cargado:</Text>
                                        <Flex ml={1}>
                                            <li>{nombreArchivo}</li>
                                        </Flex>
                                    </Stack>
                                )}
                            </Box>
                        </Stack>
                    </FormControl>
                </ModalBody>
                <ModalFooter mt={6}>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handleconfirmar}
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
