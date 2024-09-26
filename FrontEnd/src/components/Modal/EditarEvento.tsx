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
    Box,
    FormControl,
    FormLabel,
    Textarea
} from '@chakra-ui/react';
  import  { useState, useEffect } from 'react';
  
  interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    confirmar: (titulo:string, lugar:string, tematica: string, descripcion:string, fecha: string) => void;
    evento: any;
  }

  const googleMapsApiKey = 'AIzaSyB6cFwxUytgrCP9pqTTEIiLMm477qpJjPs';

export default function ModalEditarEvento({ isOpen, onClose, confirmar, evento, }: ModalComponentProps) {
   
    const handleconfirmar = () => {
      confirmar(titulo, lugar, tematica, descripcion, fecha);
      onClose();
    };

    // funcion para validar que los campos no esten vacios
    const isFormValid = () => {
        return (titulo.trim() !== '') && (lugar.trim() !== '') && (tematica.trim() !== '') && (fecha.trim() !== '');
    };


    const [titulo, setTitulo] = useState('');
    const [lugar, setLugar] = useState('');
    const [tematica, setTematica] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState('');
    const [latitud, setLatitud] = useState<number | null>(null);
    const [longitud, setLongitud] = useState<number | null>(null);

    // la diferencia de este modal con el de agregar es que las variables de estado se inicializan con los valores del evento
    useEffect(() => {
        if (evento) {
        setTitulo(evento.titulo);
        setLugar(evento.lugar);
        setTematica(evento.tematica);
        setDescripcion(evento.descripcion);
        setFecha(evento.fecha);
        }
    }, [evento]);  //el segundo parametro del useeffect indica una variable que si cambia se ejecuta lo que esta dentro del useeffect

    if (!evento) {
        return null;
    }

    const handlePlaceChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const address = e.target.value;
      setLugar(address);
    };
  
    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const address = lugar;
        if (address) {
          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&components=locality:Resistencia|administrative_area:Chaco|country:AR&key=${googleMapsApiKey}`);
          const data = await response.json();
  
          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            setLatitud(location.lat);
            setLongitud(location.lng);
            setLugar(data.results[0].formatted_address); // Actualiza el input con el nombre del lugar
          } else {
            setLatitud(null);
            setLongitud(null);
          }
        } else {
          setLatitud(null);
          setLongitud(null);
        }
      }
    };
  
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="700px">
            <ModalHeader>Editar {evento.titulo}</ModalHeader>
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
                          variant="unstyled"
                          borderWidth={1}
                          value={lugar}
                          onChange={handlePlaceChange}
                          onKeyPress={handleKeyPress}
                          style={{ width: '100%', height: '64%' }}
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
    </>
  );
}