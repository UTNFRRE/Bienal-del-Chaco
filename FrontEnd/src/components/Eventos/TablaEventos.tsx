import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  IconButton,
  Button,
  Input,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  getEventos,
  addEvento,
  editEvento,
  deleteEvento,
} from '../../API/Admin/Eventoss';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useEdicion } from '../../EdicionContexto';
import ModalConfirmar from '../Modal/ConfirmarCambios';
import ModalAgregarEvento from '../Modal/AgregarEvento';
import ModalEditarEvento from '../Modal/EditarEvento';

// Agregar paginacion
// La parte de filtrado robe de por ahi, asi que ignoren nms eso por ahora

function TablaEventos() {
  const [eventos, setEventos] = useState<any[]>([]); //se usa una variable de estado para guardar los eventos, esta variable es del tipo any (objeto)
  const [EventoElegido, setEventoElegido] = useState<any>(); //se usa una variable de estado para guardar el evento que se quiere eliminar o editar
  const [refresh, setRefresh] = useState(false);
  const {edicion} = useEdicion();

  // isopen, onopen y onclose son funciones que se usan para abrir y cerrar cada modal
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();



  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const data = await getEventos(edicion); // se hace la solicitud a la api para obtener los eventos
        console.log(data);
        setEventos(data);
      } catch (error) {
        console.error('Error fetching eventos:', error);
      }
    };

    fetchEventos();
  }, [refresh, edicion]);


  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  //funcion que se llama cuando se elige un evento para eliminar, seteo la variable de estado con el evento elegido y abro el modal
  const handleDelete = (evento: any) => {
    setEventoElegido(evento);
    onOpenDelete();
  };

  // funcion que se pasa como parametro al modal de confirmar cambios, y se llama dentro del modal llama cuando se selecciona confirmar
  const handleConfirmarDelete = async () => {
    const DeleteObra = async () => {
      try {
        if (EventoElegido) {
          await deleteEvento(EventoElegido.id);
          setRefresh(!refresh);
        }
      } catch (error) {
        console.error('Error al eliminar evento:', error);
      }
    };
    DeleteObra();

    onCloseDelete();
  };

  const handleConfirmarAdd = async (
    nombre: string,
    lugar: string,
    tematica: string,
    descripcion: string,
    fecha: string,
    longitud: number,
    latitud: number
  ) => {
  
    const PostEvento = async () => {
      try {
        await addEvento(
          nombre,
          fecha,
          lugar,
          descripcion,
          tematica,
          longitud,
          latitud,
          edicion
        );
        setRefresh(!refresh);
      } catch (error) {
        console.error('Error al agregar evento:', error);
      }
    };
    PostEvento();
    onCloseAdd();
  };

  const handleEditar = (evento: any) => {
    setEventoElegido(evento);
    onOpenEdit();
  };

  const handleConfirmarEdit = async (
    nombre: string,
    lugar: string,
    tematica: string,
    descripcion: string,
    fecha: string,
    longitud: number,
    latitud: number
  ) => {

    const PutEvento = async () => {
      try {
        if (EventoElegido) {
          await editEvento(
            EventoElegido.id,
            nombre,
            fecha,
            lugar,
            descripcion,
            tematica,
            longitud,
            latitud
          );
          setRefresh(!refresh);
        }
      } catch (error) {
        console.error('Error al editar evento:', error);
      }
    };

    PutEvento();
    onCloseEdit();
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Flex justifyContent="center" mb={4} mt={4} gap={4}>
          <Button
            leftIcon={<AddIcon />}
            borderRadius={3}
            onClick={onOpenAdd}
            variant="bienal"
          >
            Agregar Evento
          </Button>
          
        </Flex>
        <Box
          // borderWidth="1px"
          bg="secundaryBg"
          p={6}
          pl={{base:1}}
          ml={{base:0}}
          // boxShadow="md"
          w={{base:"99%", md:"80%"}}
          borderWidth={1}
          borderColor={'secundaryHover'}
          // position="relative"
          // overflowX="auto"
          // overflowY="auto"
        >
          {eventos.length > 0 ? (
            <Box overflowX="auto" w={'100%'}>
              <Table variant="striped" colorScheme="secundaryBg" width="100%">
                <Thead>
                  <Tr mt={6}>
                    <Th textAlign="center">Nombre</Th>
                    <Th textAlign="center" display={{ base: 'none', md: 'table-cell' }} >Lugar</Th>
                    <Th textAlign="center" display={{ base: 'none', md: 'table-cell' }}>Tematica</Th>
                    <Th textAlign="center" minW="300px" display={{ base: 'none', md: 'table-cell' }}>
                      Descripcion
                    </Th>
                    <Th textAlign="center" minW={{ base: '90px', sm: '200px', md: '250px', lg: '300px'} } >Fecha</Th>
                    <Th textAlign="center">Acciones</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {eventos.map((evento, index) => (
                    <Tr key={index}>
                      <Td textAlign="center">{evento.nombre}</Td>
                      <Td textAlign="center" display={{ base: 'none', md: 'table-cell' }}>{evento.lugar}</Td>
                      <Td textAlign="center" display={{ base: 'none', md: 'table-cell' }}>{evento.tematica}</Td>
                      <Td textAlign="center" display={{ base: 'none', md: 'table-cell' }}>
                        {truncateText(evento.descripcion, 40)}
                      </Td>
                      <Td textAlign="center" minW={{ base: '90px', sm: '200px', md: '250px', lg: '300px'} }  >{formatDate(evento.fecha)}</Td>
                      <Td>
                        <Flex
                          gap={2}
                          justifyContent="center"
                          alignItems="center"
                          direction={{ base: 'column', md: 'row' }}
                        >
                          <IconButton
                            aria-label="Editar"
                            icon={<EditIcon />}
                            variant="bienal"
                            borderRadius={3}
                            onClick={() => handleEditar(evento)}
                          />

                          <IconButton
                            aria-label="Eliminar"
                            icon={<DeleteIcon />}
                            variant="delete"
                            borderRadius={3}
                            onClick={() => handleDelete(evento)}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : (
            <Text>No hay datos disponibles</Text>
          )}
        </Box>
      </Flex>
      {/* Al final del flex principal se agregan las tags de los modal */}
      <ModalConfirmar
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        texto={`¿Estás seguro que deseas eliminar ${EventoElegido?.nombre}?`}
        confirmar={handleConfirmarDelete}
      />
      <ModalAgregarEvento
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        confirmar={handleConfirmarAdd}
      />
      <ModalEditarEvento
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        confirmar={handleConfirmarEdit}
        evento={EventoElegido}
      />
    </>
  );
}
export default TablaEventos;
