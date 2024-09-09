import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
  } from '@chakra-ui/react';
  
  interface ModalComponentProps {
    isOpen: boolean;
    onClose: () => void;
    texto: string;
    confirmar: () => void;
  }
  export default function ModalConfirmar({
    isOpen,
    onClose,
    texto,
    confirmar,
  }: ModalComponentProps) {

    const handleconfirmar = () => {
      //llama a la funcion que se paso como parametro y cierra el modal
      confirmar();
      onClose();
    };

    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirmar cambios</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>{texto}</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleconfirmar}
                size="sm"
              >
                Aceptar
              </Button>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onClose}
                variant="light"
                borderColor={"black"}
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