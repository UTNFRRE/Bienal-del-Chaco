import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormLabel,
  Input,
  Box,
  Flex,
} from '@chakra-ui/react';

interface NuevoElementoModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmar : (año: string, fechaInicio: string, fechaFin: string) => void;
}

const NuevoElementoModal: React.FC<NuevoElementoModalProps> = ({ isOpen, onClose, confirmar }) => {
    const handleconfirmar = () => {
        confirmar(año, fechaInicio, fechaFin);
        onClose();
    };
    const [año, setAño] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nueva Edición</ModalHeader>
        <ModalCloseButton />
        <ModalBody gap={4} flexDirection={'column'}>
                <Box mb={4}>
                  <FormLabel mb={0}>Año</FormLabel>
                  <Input
                    placeholder=""
                    size="md"
                    variant="flushed"
                    borderWidth={1}
                    flex={1}
                    value={año}
                    onChange={(e) => setAño(e.target.value)}
                  />
                </Box>
                <Flex direction={'row'} w={'100%'} gap={2}>
                    <Box w={'100%'}>
                    <FormLabel mb={0}>Fecha de Inicio</FormLabel>
                    <Input
                        placeholder=""
                        size="md"
                        variant="Unstyled"
                        type='date'
                        borderWidth={1}
                        flex={1}
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                    </Box>
                    <Box w={'100%'}>
                    <FormLabel mb={0}>Fecha de Fin</FormLabel>
                    <Input
                        placeholder=""
                        size="md"
                        variant="Unstyled"
                        type='date'
                        borderWidth={1}
                        flex={1}
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />
                    </Box>
                </Flex>
        </ModalBody>
        <ModalFooter mt={6}>
          <Button
            variant={'bienal'}
            mr={3}
            onClick={handleconfirmar}
            size="sm"
          >
            Agregar
          </Button>
          <Button mr={3} onClick={onClose} variant="light" size="sm">
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NuevoElementoModal;