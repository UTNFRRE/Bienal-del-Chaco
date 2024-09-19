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
    Textarea,
    Box,
    FormLabel,
    FormControl,
  } from '@chakra-ui/react';
  import { useEffect, useState } from 'react';
  
  interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    confirmar: (
      titulo: string,
      lugar: string,
      tematica: string,
      descripcion: string,
      // por ahora lo dejo como string, pero deberia ser un objeto Date
      fecha: string
    ) => void;
  }
  export default function ModalAgregarEvento({ isOpen, onClose, confirmar, }: ModalComponentProps) {

    // variables de estado para guardar los valores de los inputs
    const [titulo, setTitulo] = useState(' ');
    const [lugar, setLugar] = useState('');
    const [tematica, setTematica] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
  
    const handleconfirmar = () => {
        // llamo a la funcion que se paso como parametro y le paso los valores de los inputs
      confirmar(titulo, lugar, tematica, descripcion, fecha);

      // cierro el modal
      onClose();
    };

    // funcion para validar que los campos no esten vacios
    const isFormValid = () => {
        return (titulo.trim() !== '') && (lugar.trim() !== '') && (tematica.trim() !== '') && (fecha.trim() !== '');
    };

    // limpio los campos del formulario cuando se cierra el modal
    useEffect(() => {
        setTitulo('');
        setLugar('');
        setTematica('');
        setDescripcion('');
        setFecha('');
    }, [isOpen]);

  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} >
          <ModalOverlay />
          <ModalContent  maxW="700px">
            <ModalHeader>Agregar Evento</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <FormControl isRequired>
              <Stack gap={7}>
                <Stack direction="row" gap={5} w="100%">
                    <Box>
                        <FormLabel mb={0}>Titulo</FormLabel>
                        <Input
                        placeholder=""
                        size="md"
                        variant="Unstyled"
                        borderWidth={1}
                        value={titulo}
                        flex={1}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    </Box>
                    <Box>
                        <FormLabel mb={0}>Lugar</FormLabel>
                        <Input
                        placeholder=""
                        size="md"
                        variant="Unstyled"
                        borderWidth={1}
                        flex={1}
                        value={lugar}
                        onChange={(e) => setLugar(e.target.value)}
                        />
                    </Box>
                    <Box>
                        <FormLabel mb={0}>Tematica</FormLabel>
                        <Input
                        placeholder=""
                        size="md"
                        variant="Unstyled"
                        borderWidth={1}
                        flex={1}
                        value={tematica}
                        onChange={(e) => setTematica(e.target.value)}
                        />
                    </Box>
                </Stack>
                <Box>
                    <Text>Descripción</Text>
                    <Textarea
                        placeholder=""
                        size="md"
                        variant="outline"
                        h={150}
                        borderWidth={1}
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </Box>
                <Box>
                    <FormLabel mb={0}>Fecha:</FormLabel>
                    <Input
                    placeholder="Fecha"
                    size="md"
                    variant="flushed"
                    type='date'
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    />
                </Box>
                
              </Stack>
            </FormControl>
            </ModalBody>
            <ModalFooter mt={6}>
              <Button
                variant={'bienal'}
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
      </>
    );
  }