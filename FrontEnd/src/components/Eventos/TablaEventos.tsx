import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, IconButton, Button, Input} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons'; 
import Eventos from '../../API/Admin/Eventos';
import {useState , useEffect} from 'react';
import { useDisclosure } from '@chakra-ui/react';
import ModalConfirmar from '../Modal/ConfirmarCambios';
import ModalAgregarEvento from '../Modal/AgregarEvento';
import ModalEditarEvento from '../Modal/EditarEvento';

// Agregar paginacion
// La parte de filtrado robe de por ahi, asi que ignoren nms eso por ahora

function TablaEventos () {

    const [eventos, setEventos] = useState<any[]>([]); //se usa una variable de estado para guardar los eventos, esta variable es del tipo any (objeto)
    const [filteredEventos, setFilteredEventos] = useState<any[]>([]);
    const [EventoElegido, setEventoElegido] = useState<any>(); //se usa una variable de estado para guardar el evento que se quiere eliminar o editar
    
    // isopen, onopen y onclose son funciones que se usan para abrir y cerrar cada modal
    const { 
        isOpen: isOpenDelete, 
        onOpen: onOpenDelete, 
        onClose: onCloseDelete 
    } = useDisclosure();
    const { 
      isOpen: isOpenAdd, 
      onOpen: onOpenAdd, 
      onClose: onCloseAdd 
    } = useDisclosure();
    const {
      isOpen: isOpenEdit,
      onOpen: onOpenEdit,
      onClose: onCloseEdit
    } = useDisclosure();
    

    const [filters, setFilters] = useState({
        titulo: '',
        lugar: '',
        tematica: '',
        descripcion: '',
        fecha: '',
    });
    const [MostrarFiltros, setMostrarFiltros] = useState(false);

    useEffect(() => {
        setEventos(Eventos)   //esto se hace dentro de un useeffect para que se ejecute solo una vez, en este caso cuando se recarga la pagina
        setFilteredEventos(Eventos);
    }, [])

    // filtros
    useEffect(() => {
        setFilteredEventos(
          eventos.filter(evento =>
            evento.titulo.toLowerCase().includes(filters.titulo.toLowerCase()) &&
            evento.lugar.toLowerCase().includes(filters.lugar.toLowerCase()) &&
            evento.tematica.toLowerCase().includes(filters.tematica.toLowerCase()) &&
            evento.descripcion.toLowerCase().includes(filters.descripcion.toLowerCase()) &&
            evento.fecha.toLowerCase().includes(filters.fecha.toLowerCase())
          )
        );
    }, [filters, eventos]);
     
    // funcion para manejar los cambios en los filtros
    const handleFilterChange = (e:any) => {
        const { name, value } = e.target;
        setFilters({
          ...filters,
          [name]: value,
        });
    };

    const truncateText = (text:string, maxLength:number) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    //funcion que se llama cuando se elige un evento para eliminar, seteo la variable de estado con el evento elegido y abro el modal
    const handleDelete = (evento:any) => {
      setEventoElegido(evento);
      onOpenDelete()
    }

    // funcion que se pasa como parametro al modal de confirmar cambios, y se llama dentro del modal llama cuando se selecciona confirmar
    const handleConfirmarDelete = async () => {
          setEventos((prevEventos) =>
            prevEventos.filter((m) => m.id !== EventoElegido.id)
          ); // Elimina del json el evento elegido

        onCloseDelete();
    };

    const handleConfirmarAdd = async (titulo:string, lugar:string, tematica:string, descripcion:string, fecha:string) => {
      // Aca se hace el llamado a la funcion de la api que agrega un evento
      // Agregar el evento al json
      setEventos((prevEventos) => [
        ...prevEventos,
        {
          id: prevEventos.length + 1,
          titulo: titulo,
          lugar: lugar,
          tematica: tematica,
          descripcion: descripcion,
          fecha: fecha,
        },
      ]);
      onCloseAdd();
    };

    const handleEditar = (evento:any) => {
      setEventoElegido(evento);
      onOpenEdit();
    };
    
    const handleConfirmarEdit = async (titulo:string, lugar:string, tematica:string, descripcion:string, fecha:string) => {
      // Aca se hace el llamado a la funcion de la api que edita un evento
      // Editar el evento en el json
      setEventos((prevEventos) =>
        prevEventos.map((m) =>
          m.id === EventoElegido.id
            ? {
                ...m,
                titulo: titulo,
                lugar: lugar,
                tematica: tematica,
                descripcion: descripcion,
                fecha: fecha,
              }
            : m
        )
      );
      onCloseEdit();
    };

    return (
     <>
            <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
            <Flex justifyContent="center" mb={4} mt={4} gap={4}>
                <Button leftIcon={<AddIcon />} borderRadius={3} onClick={onOpenAdd} variant="bienal">Agregar Evento</Button>
                {/* Al hacer click niego lo que tenia showfilters, la excpresion de abajo es un condicional simple en js */}
                <Button variant="bienal" onClick={() => setMostrarFiltros(!MostrarFiltros)} leftIcon={<SearchIcon />} borderRadius={3}>
                {MostrarFiltros ? 'Ocultar Filtros' : 'Filtrar'}
                </Button>
            </Flex>
            <Box
                // borderWidth="1px"
                bg="secundaryBg"
                p={6}
                // boxShadow="md"
                w="80%"
                // position="relative"
                // overflowX="auto"
                // overflowY="auto"
            >
            {eventos.length > 0 ? (
              <>
                <Table variant="striped" colorScheme="secundaryBg" width="100%">
                  <Thead>
                    {/* Si MostrarFiltros es verdadero entonces... */}
                    {MostrarFiltros && (
                      <Tr>
                        <Th>
                          <Input
                            variant='flushed'
                            placeholder="Filtrar por Titulo"
                            name="titulo"
                            value={filters.titulo}
                            onChange={handleFilterChange}
                          />
                        </Th>
                        <Th>
                          <Input
                            variant='flushed'
                            placeholder="Filtrar por Lugar"
                            name="lugar"
                            value={filters.lugar}
                            onChange={handleFilterChange}
                          />
                        </Th>
                        <Th>
                          <Input
                            variant='flushed'
                            placeholder="Filtrar por Tematica"
                            name="tematica"
                            value={filters.tematica}
                            onChange={handleFilterChange}
                          />
                        </Th>
                        <Th>
                          <Input
                            variant='flushed'
                            placeholder="Filtrar por Descripcion"
                            name="descripcion"
                            value={filters.descripcion}
                            onChange={handleFilterChange}
                          />
                        </Th>
                        <Th>
                          <Input
                            variant='flushed'
                            placeholder="Filtrar por Fecha"
                            name="fecha"
                            type='date'
                            value={filters.fecha}
                            onChange={handleFilterChange}
                          />
                        </Th>
                        <Th></Th>
                      </Tr>
                    )}
                    <Tr mt={6}>
                      <Th textAlign="center">Titulo</Th>
                      <Th textAlign="center">Lugar</Th>
                      <Th textAlign="center">Tematica</Th>
                      <Th textAlign="center" minW="300px">Descripcion</Th>
                      <Th textAlign="center">Fecha</Th>
                      <Th textAlign="center">Acciones</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filteredEventos.map((evento, index) => (
                      <Tr key={index} >
                        <Td textAlign="center">{evento.titulo}</Td>
                        <Td textAlign="center">{evento.lugar}</Td>
                        <Td textAlign="center">{evento.tematica}</Td>
                        <Td textAlign="center">{truncateText(evento.descripcion, 40)}</Td>
                        <Td textAlign="center">{evento.fecha}</Td>
                        <Td>
                          <Flex gap={2} justifyContent="center" alignItems="center">
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
              </>
            ) : (
              <Text>No hay datos disponibles</Text>
            )}
        </Box>
        </Flex>
        {/* Al final del flex principal se agregan las tags de los modal */}
        <ModalConfirmar
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        texto={`¿Estás seguro que deseas eliminar ${EventoElegido?.titulo}?`}
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
        )
    }
export default TablaEventos;