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
    Textarea,
    FormLabel,
    Select,
    FormControl,
    Box,
    Flex,
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import DropZone from '../ZonaCarga/ZonaCarga';
import Escultores from '../../API/Escultores';



interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    confirmar:(
        titulo:string, 
        tematica:string, 
        fecha:string, 
        autor:string, 
        paisAutor:string, 
        descripcion:string, 
        imagenes: string[], 
    ) => void;
    evento: any;
}

function ModificarObra({isOpen, onClose, confirmar, evento}: ModalProps) {

    const [titulo, setTitulo] = useState('');  
    const [tematica, setTematica] = useState('');
    const [escultorPais, setEscultorPais] = useState('');
    const [imagen, setImagen] = useState<string[]>(['']); // Como recupero la ruta de la imagen?
    const [autor, setAutor] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');


    const handleConfirmar = () => {
        confirmar(titulo, tematica, fecha, autor, escultorPais, descripcion, imagen);
        onClose();
    }

    const [listaEscultores, setListaEscultores] = useState<string[]>([]);
    useEffect(() => {
        const nombresEscultores = Escultores.map((escultor) => escultor.nombre);
        setListaEscultores(nombresEscultores);
    }, []);


    const handleAutor = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setAutor(e.target.value);
        setEscultorPais(Escultores.find((escultor) => escultor.nombre === autor)?.pais || '');
    }

    useEffect(() => {
        if (evento){
            setTitulo(evento.nombre);
            setTematica(evento.tematica);
            setAutor(evento.autor);
            setEscultorPais(evento.paisAutor);
            setDescripcion(evento.descripcion);
            setFecha(evento.fecha);
            setImagen(evento.imagenes);
        }
    }, [evento]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent maxW="50%">
                <ModalHeader>Modificar Obra</ModalHeader>
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
                                        <Select placeholder={autor} value={autor} onChange={handleAutor}>
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
                                <Stack direction="column" gap={0} justifyContent={"flex-start"}>
                                <FormLabel>Descripcion</FormLabel>
                                    <Flex justify='center' width="100%"> 
                                        <Textarea placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                    </Flex>
                                </Stack>
                                <Stack direction="column" gap={0} justifyContent={"flex-start"}>
                                <FormLabel>Imagen</FormLabel>
                                    <Flex w="90%" flex={1}>
                                        {/* Como recupero la ruta de la imagen? */}
                                        <DropZone maxFiles={10} fileUploads={imagen}/> 
                                      
                                    </Flex>
                                </Stack>
                            </Stack>
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleConfirmar}>
                        Guardar Cambios
                    </Button>
                    <Button onClick={onClose} variant="light">Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModificarObra;