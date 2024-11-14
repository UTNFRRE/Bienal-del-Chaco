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
import DropZone from '../ZonaCarga/ZonaCarga';
interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  confirmar: (
    nombre: string,
    fechaNacimiento: string,
    lugarNacimiento: string,
    premios: string,
    pais: string,
    telefono: string,
    foto: string | File,
  ) => void;
  escultor: any;
}

function ModalEditarEscultor({isOpen, onClose,confirmar,escultor}: ModalComponentProps) {


  const handleconfirmar = () => {
    confirmar(
      nombre,
      fechaNacimiento,
      lugarNacimiento,
      premios,
      pais,
      telefono,
      foto || '', 
    );
    setNombre('');
    setPais('');
    setTelefono('');
    setFechaNacimiento('');
    setLugarNacimiento('');
    setPremios('');
    onClose();
  };

  const [foto, setFoto] = useState<string | File>('');
  const [imagenPrev, setImagenPrev] = useState<string>('');
  const [nombre, setNombre] = useState('');
  const [pais, setPais] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [lugarNacimiento, setLugarNacimiento] = useState('');
  const [premios, setPremios] = useState('');
  //const {edicion} = useEdicion();
  //const [edicionAño, setEdicion] = useState('');

  useEffect(() => {
    if (escultor) {
      setNombre(escultor.nombre);
      setPais(escultor.pais);
      setTelefono(escultor.telefono);
      setFechaNacimiento(escultor.fechaNacimiento);
      setLugarNacimiento(escultor.lugarNacimiento);
      setPremios(escultor.premios);
      setImagenPrev(`${escultor.foto}?${new Date().getTime()}`); //Se agrega marca de tiempo, pq sino la imagen queda en cache del navegador
      setFoto(escultor.foto);
      //setEdicion(escultor.edicionAño);
    }
  }, [escultor]);

  if (!escultor) {
    return null;
  }

  const handleFilesChange = (files: File[]) => {
    setFoto(files[0]);
    console.log('La imagen es' + files[0]);
  };

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
                  <FormLabel mb={1}>Nombre y Apellido</FormLabel>
                  <Input
                    placeholder=""
                    size="md"
                    variant="Unstyled"
                    width={370}
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
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
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
                    type="date"
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
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <DropZone
                maxFiles={1}
                fileUploads={imagenPrev}
                onFilesChange={handleFilesChange}
              />
              </div>
            </Stack>
          </FormControl>
        </ModalBody>
        <ModalFooter mt={6}>
          <Button
            mr={3}
            onClick={handleconfirmar}
            size="sm"
            variant={'bienal'}
          >
            Guardar Cambios
          </Button>
          <Button mr={3} onClick={onClose} variant="light" size="sm">
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalEditarEscultor;
