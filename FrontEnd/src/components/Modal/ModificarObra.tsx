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
import { getEscultores } from '../../API/Admin/Obras';

interface Escultor {
    id: number;
    nombre: string;
    pais: string;
    foto: string;
  }
  

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    confirmar:(
        titulo:string, 
        tematica:string, 
        fecha:string, 
        autor:number, 
        paisAutor:string, 
        descripcion:string, 
        imagenes: string | File, 
    ) => void;
    obra: any;
}

function ModificarObra({isOpen, onClose, confirmar, obra  }: ModalProps) {

    const [titulo, setTitulo] = useState('');  
    const [tematica, setTematica] = useState('');
    const [escultorPais, setEscultorPais] = useState('');
    const [imagenPrev, setImagenPrev] = useState<string>('');
    const [imagen, setImagen] = useState<string | File>(''); // Como recupero la ruta de la imagen?
    const [autor, setAutor] = useState<number>(0);
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [Escultoress, setEscultoress] = useState<Escultor[]>([]);



    const handleConfirmar = () => {
        confirmar(titulo, tematica, fecha, autor, escultorPais, descripcion, imagen);
        setTitulo('');
        setTematica('');
        setEscultorPais('');
        setImagen('');
        setAutor(0);
        setDescripcion('');
        setFecha('');
        onClose();
    }

    const [listaEscultores, setListaEscultores] = useState<any[]>([])

    useEffect(() => {
        if (obra){
            setTitulo(obra.nombre);
            setTematica(obra.tematica);
            setAutor(obra.escultorID);
            setEscultorPais(obra.escultorPais);
            setDescripcion(obra.descripcion);
            setFecha(obra.fechaCreacion);
            setImagenPrev(`${obra.imagenes}?${new Date().getTime()}`);   //Se agrega marca de tiempo, pq sino la imagen queda en cache del navegador
            setImagen(obra.imagenes);
        }
        const fetchEscultores = async () => {
            try {
                const data = await getEscultores();
                setEscultoress(data);
                const nombresEscultores = Escultoress.map((escultor) => ({ id: escultor.id, nombre: escultor.nombre }));
                setListaEscultores(nombresEscultores);
            } catch (error) {
                console.error('Error en el fetch de escultores:', error);
            }
        };
        fetchEscultores();
    }, [isOpen]);

    const handleFilesChange = (files: File[]) => {
        setImagen(files[0]);
        console.log('La imagen es' + files[0]);
    };

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
                                        <FormLabel ml="2px" mb={1}>Titulo</FormLabel>
                                        <Input placeholder="Titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                                    </Box>
                                    <Box>
                                        <FormLabel ml="2px" mb={1}>Tematica</FormLabel>
                                        <Input placeholder="Tematica" value={tematica} onChange={(e) => setTematica(e.target.value)} />
                                    </Box>
                                    <Box>
                                        <FormLabel ml="2px" mb={1} >Fecha Creación</FormLabel>
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
                                <Stack direction="row" gap={3} align="center" w="100%">
                                    <Box w="100%">
                                        <FormLabel ml="2px" mb={1}>Escultor</FormLabel>
                                        <Select 
                                            placeholder='Seleccione escultor' 
                                            value={autor} 
                                            onChange={(e) => setAutor(Number(e.target.value))}
                                        >
                                            {listaEscultores.map((escultor) => (
                                                <option key={escultor.id} value={escultor.id}>
                                                    {escultor.nombre}
                                                </option>
                                            ))}
                                        </Select>
                                        {/* <Input placeholder="Escultor" value={autor} onChange={(e) => setAutor(Number(e.target.value))}/> */}
                                    </Box>
                                    <Box w="100%">
                                        <FormLabel ml="2px" mb={1}>Pais</FormLabel>
                                        <Input placeholder="Pais" value={escultorPais} onChange={(e) => setEscultorPais(e.target.value)}/>
                                    </Box>
                                </Stack>
                                <Stack direction="column" gap={0} justifyContent={"flex-start"}>
                                <FormLabel mb={1}>Descripcion</FormLabel>
                                    <Flex justify='center' width="100%"> 
                                        <Textarea placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                    </Flex>
                                </Stack>
                                <Stack direction="column" gap={0} justifyContent={"flex-start"}>
                                <FormLabel ml="2px" mb={1}>Imagen</FormLabel>
                                    <Flex w="90%" flex={1}>
                                        {/* Como recupero la ruta de la imagen? */}
                                        <DropZone maxFiles={10} fileUploads={imagenPrev} onFilesChange={handleFilesChange}/> 
                                    </Flex>
                                </Stack>
                            </Stack>
                        </FormControl>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button variant={'bienal'} mr={3} onClick={handleConfirmar}>
                        Guardar Cambios
                    </Button>
                    <Button onClick={onClose} variant="light">Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModificarObra;