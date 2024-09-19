import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Select,
    Button,
    Stack,
    Textarea,
    FormLabel,
    FormControl,
    Box,
    Flex,
  } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import DropZone from '../ZonaCarga/ZonaCarga';
import Escultores from '../../API/Escultores';



interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    confirmar: (
        titulo: string,
        tematica: string,
        fecha: string,
        autor: string,
        paisAutor: string,
        descripcion: string,
        imagenes: File[],
    ) => void;
}

function AgregarObra({isOpen, onClose, confirmar}: ModalProps) {

    const [titulo, setTitulo] = useState('');  
    const [tematica, setTematica] = useState('');
    const [escultorPais, setEscultorPais] = useState('');
    const [imagen, setImagen] = useState<File[]>([]); // Estado para almacenar múltiples archivos de imagen, se usara despues
    const [autor, setAutor] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');

    const [listaEscultores, setListaEscultores] = useState<string[]>([]);

    useEffect(() => {
        const nombresEscultores = Escultores.map((escultor) => escultor.nombre);
        setListaEscultores(nombresEscultores);
    }, []);


    function handleConfirmarAdd() {
        confirmar(titulo,tematica,fecha, autor,escultorPais,descripcion, imagen);
        onClose();
    }

    const handleAutor = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setAutor(e.target.value);
        setEscultorPais(Escultores.find((escultor) => escultor.nombre === autor)?.pais || '');
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="50%" >
                <ModalHeader>Agregar Obra</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={20}>
                        <FormControl isRequired gap={4} >
                            <Stack gap={4} >
                                <Stack direction="row" gap={4}>
                                    <Box>
                                        <FormLabel>Titulo</FormLabel>
                                        <Input placeholder="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                                    </Box>
                                    <Box>
                                        <FormLabel>Tematica</FormLabel>
                                        <Input placeholder="Tematica" value={tematica} onChange={(e) => setTematica(e.target.value)} />
                                    </Box>
                                    <Box>
                                        <FormLabel>Fecha</FormLabel>
                                        <Input 
                                            type="date" 
                                            value={fecha}  
                                            onChange={(e) => setFecha(e.target.value)} 
                                            bg="white" 
                                            border="1px" 
                                            borderColor="gray.300" 
                                            borderRadius="md"
                                            _hover={{ borderColor: "blue.500" }}
                                            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                                        />
                                    </Box>
                                </Stack>
                                <Stack direction="row" gap={4} align="center">
                                    <Box>
                                        <FormLabel>Escultor</FormLabel>
                                        <Select placeholder='Seleccione escultor' onChange={handleAutor}>
                                            {listaEscultores.map((escultor, index) => (
                                                <option key={index} value={escultor}>
                                                    {escultor}
                                                </option>
                                            ))}
                                        </Select>
                                    </Box>
                                    <Box>
                                        <FormLabel>Pais</FormLabel>
                                        <Input placeholder="Pais" value={escultorPais} isReadOnly/>
                                    </Box>
                                </Stack>
                                <Stack direction="row" gap={4} alignItems="center">
                                    <Flex justify='center' width="90%"> 
                                        <FormLabel>Descripcion</FormLabel>
                                        <Textarea placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                    </Flex>
                                </Stack>
                                <Stack direction="row" gap={4} align="center">
                                    <Flex justify="center">
                                        <FormLabel>Imagen</FormLabel>
                                        {/* Como recupero la ruta de la imagen? */}
                                        <DropZone maxFiles={10}/>
                                    </Flex>
                                </Stack>
                            </Stack>
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button variant={'bienal'} mr={3} onClick={handleConfirmarAdd}>
                        Agregar
                    </Button>
                    <Button onClick={onClose} variant={"light"}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>      
    );
}

export default AgregarObra;