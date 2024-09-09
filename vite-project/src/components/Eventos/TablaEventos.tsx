import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, IconButton, Button, Input} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons'; 
import Eventos from '../../API/Eventos';
import {useState , useEffect} from 'react';
import { useDisclosure } from '@chakra-ui/react';
import ModalConfirmar from '../Modal/ConfirmarCambios';

// Agregar paginacion
// La parte de filtrado robe de por ahi, asi que ignoren nms eso por ahora

function TablaEventos () {

    const [eventos, setEventos] = useState<any[]>([]); //se usa una variable de estado para guardar los eventos, esta variable es del tipo any (objeto)
    const [filteredEventos, setFilteredEventos] = useState<any[]>([]);
    const [EventoElegido, setEventoElegido] = useState<any>(); //se usa una variable de estado para guardar el evento que se quiere eliminar o editar
    const { isOpen, onOpen, onClose } = useDisclosure();
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

    const handleDelete = (evento:any) => {
      setEventoElegido(evento);
      onOpen()
    }

  const handleConfirmarDelete = async () => {
        setEventos((prevEventos) =>
          prevEventos.filter((m) => m.id !== EventoElegido.id)
        ); // Elimina del json el evento elegido

      onClose();
  };

    return (
     <>
            <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
            <Flex justifyContent="center" mb={4} mt={4} gap={4}>
                <Button leftIcon={<AddIcon />} borderRadius={3}>Agregar Evento</Button>
                {/* Al hacer click niego lo que tenia showfilters, la excpresion de abajo es un condicional simple en js */}
                <Button onClick={() => setMostrarFiltros(!MostrarFiltros)} leftIcon={<SearchIcon />} borderRadius={3}>
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
                              variant="solid"
                              borderRadius={3}                                
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
        <ModalConfirmar
        isOpen={isOpen}
        onClose={onClose}
        texto={`¿Estás seguro que deseas eliminar ${EventoElegido?.titulo}?`}
        confirmar={handleConfirmarDelete}
        />
    </>
        )
    }
export default TablaEventos;