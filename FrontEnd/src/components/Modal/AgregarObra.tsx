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
import { getEscultores } from '../../API/Admin/Obras';
import DropZone from '../ZonaCarga/ZonaCarga';
import Escultores from '../../API/Escultores';
import { EdicionProvider, useEdicion } from '../../EdicionContexto';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmar: (
    titulo: string,
    tematica: string,
    fecha: string,
    autor: number,
    paisAutor: string,
    descripcion: string,
    imagen: File,
  ) => void;
}

interface Escultor {
  id: number;
  nombre: string;
  pais: string;
  foto: string;
}

function AgregarObra({ isOpen, onClose, confirmar }: ModalProps) {
  const [titulo, setTitulo] = useState('');
  const [tematica, setTematica] = useState('');
  const [escultorPais, setEscultorPais] = useState('');
  const [imagen, setImagen] = useState<File>(); // Estado para almacenar múltiples archivos de imagen, se usara despues
  const [autor, setAutor] = useState<number>(0);
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [Escultoress, setEscultoress] = useState<Escultor[]>([]);
  const {edicion} = useEdicion();

  const [listaEscultores, setListaEscultores] = useState<any[]>([]);

  useEffect(() => {
    const fetchEscultores = async () => {
      try {
        const data = await getEscultores(edicion);
        setEscultoress(data);
        const nombresEscultores = Escultoress.map((escultor) => ({
          id: escultor.id,
          nombre: escultor.nombre,
        }));
        setListaEscultores(nombresEscultores);
      } catch (error) {
        console.error('Error en el fetch de escultores:', error);
      }
    };

    fetchEscultores();

    setTitulo('');
    setTematica('');
    setEscultorPais('');
    setImagen(undefined);
    setAutor(0);
    setDescripcion('');
    setFecha('');
  }, [isOpen]);

  const handleFilesChange = (files: File[]) => {
    setImagen(files[0]);
    console.log('La imagen es' + files[0]);
  };

  function handleConfirmarAdd() {
    if (imagen) {
      console.log('encontrp');
      confirmar(
        titulo,
        tematica,
        fecha,
        autor,
        escultorPais,
        descripcion,
        imagen
      );
    }
    onClose();
  }

  // const handleAutor = (e: React.ChangeEvent<HTMLSelectElement>): void => {
  //     setAutor(e.target.value);
  //     setEscultorPais(Escultores.find((escultor) => escultor.nombre === autor)?.pais || '');
  // }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="50%">
        <ModalHeader>Agregar Obra</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={20}>
            <FormControl isRequired gap={4}>
              <Stack gap={4}>
                <Stack direction="row" gap={4}>
                  <Box>
                    <FormLabel ml="2px" mb={1}>
                      Titulo
                    </FormLabel>
                    <Input
                      placeholder="Titulo"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <FormLabel ml="2px" mb={1}>
                      Tematica
                    </FormLabel>
                    <Input
                      placeholder="Tematica"
                      value={tematica}
                      onChange={(e) => setTematica(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <FormLabel ml="2px" mb={1}>
                      Fecha
                    </FormLabel>
                    <Input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      bg="white"
                      border="1px"
                      borderColor="gray.300"
                      borderRadius="md"
                      _hover={{ borderColor: 'blue.500' }}
                      _focus={{
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px blue.500',
                      }}
                    />
                  </Box>
                </Stack>
                <Stack direction="row" gap={4} align="center">
                  <Box w="100%">
                    <FormLabel ml="2px" mb={1}>
                      Escultor
                    </FormLabel>
                    <Select
                      placeholder="Seleccione escultor"
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
                    <FormLabel ml="2px" mb={1}>
                      Pais
                    </FormLabel>
                    <Input
                      placeholder="Pais"
                      value={escultorPais}
                      onChange={(e) => setEscultorPais(e.target.value)}
                    />
                  </Box>
                </Stack>
                <Stack direction="column" gap={0} justifyContent={'flex-start'}>
                  <FormLabel ml="2px" mb={1}>
                    Descripcion
                  </FormLabel>
                  <Flex justify="center" width="100%">
                    <Textarea
                      placeholder="Descripcion"
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                    />
                  </Flex>
                </Stack>
                <Stack direction="column" gap={0} justifyContent={'flex-start'}>
                  <FormLabel ml="2px" mb={1}>
                    Imagen
                  </FormLabel>
                  <Flex justify="center">
                    <DropZone maxFiles={1} onFilesChange={handleFilesChange} />
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
          <Button onClick={onClose} variant={'light'}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AgregarObra;
