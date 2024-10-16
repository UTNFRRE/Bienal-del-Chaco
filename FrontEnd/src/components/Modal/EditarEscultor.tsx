import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Textarea,
    Button,
    Stack,
    Box,
    FormLabel,
    FormControl,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ZonaCargaEscultor from '../ZonaCarga/ZonaCargaEscultor';

interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    confirmar: (fotoPreview: string, nombre: string, pais: string, contacto: string, fechaNacimiento:string, lugarNacimiento:string, premios:string,) => void;
    escultor:any
}

export default function ModalEditarEscultor({ isOpen, onClose, confirmar, escultor, }: ModalComponentProps) {
    
    const handleFotoChange = (fotoData: string) => {
        setFoto(fotoData);
    };


    const handleconfirmar = () => {
        confirmar(foto || '', nombre, pais, contacto, fechaNacimiento, lugarNacimiento, premios);
        onClose();
    };

    const isFormValid = () => {
        return nombre.trim() !== '' && pais.trim() !== '' && contacto.trim() !== '' && fechaNacimiento.trim() !== '' && lugarNacimiento.trim() !== '' && (premios ? premios.toString().trim() !== '' : true);
    };

    const [foto, setFoto] = useState<string | null>(null);
    const [nombre, setNombre] = useState('');
    const [pais, setPais] = useState('');
    const [contacto, setContacto] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [lugarNacimiento, setLugarNacimiento] = useState('');
    const [premios, setPremios] = useState('');

    useEffect(() => {
        if(escultor){
        setNombre(escultor.nombre);
        setPais(escultor.pais);
        setContacto(escultor.contacto);
        setFoto(escultor.foto);
        setFechaNacimiento(escultor.fechaNacimiento);
        setLugarNacimiento(escultor.lugarNacimiento);
        setPremios(escultor.premios);
    }
    }, [escultor]);

    if (!escultor) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="700px">
                <ModalHeader>Editar {escultor.nombre}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl isRequired>
                        <Stack gap={7}>
                            <Stack direction="row" gap={5} w="100%">
                                <Box>
                                    <FormLabel mb={1}>Nombre</FormLabel>
                                    <Input
                                        placeholder=""
                                        size="md"
                                        variant="Unstyled"
                                        width={650}
                                        borderWidth={1}
                                        flex={1}
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                </Box>
                            </Stack>
                            <Stack direction="row" gap={5} w="100%">
                                <Box>
                                    <FormLabel mb={1}>Pais</FormLabel>
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
                                    <FormLabel mb={1}>Contacto</FormLabel>
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
                            <Stack direction="row" gap={5} w="100%">
                                <Box>
                                    <FormLabel mb={0}>Fecha de Nacimiento</FormLabel>
                                    <Input
                                        placeholder=""
                                        size="md"
                                        variant="Unstyled"
                                        width={315}
                                        type='date'
                                        borderWidth={1}
                                        flex={1}
                                        value={fechaNacimiento}
                                        onChange={(e) => setFechaNacimiento(e.target.value)}
                                    />
                                </Box>
                                <Box>
                                    <FormLabel mb={0}>Lugar de Nacimiento</FormLabel>
                                    <Input
                                        placeholder=""
                                        size="md"
                                        variant="Unstyled"
                                        width={315}
                                        borderWidth={1}
                                        flex={1}
                                        value={lugarNacimiento}
                                        onChange={(e) => setLugarNacimiento(e.target.value)}
                                    />
                                </Box>
                            </Stack>
                            <Stack direction="row" gap={5} w="100%">
                                <Box>
                                    <FormLabel mb={0}>Premios</FormLabel>
                                    <Textarea
                                        placeholder=""
                                        size="md"
                                        variant="outline"
                                        h={140}
                                        width={650}
                                        maxLength={5000}
                                        borderWidth={1}
                                        value={premios}
                                        onChange={(e) => setPremios(e.target.value)}
                                    />
                                </Box>
                            </Stack>
                            <ZonaCargaEscultor maxFiles={1} handleFotoChange={handleFotoChange}/>
                            
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
                Guardar Cambios
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