// Objective: Create a page to manage the works of the artists.
import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, IconButton, Button, Input, Image } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import AgregarObra from '../../components/ModalAdmin/AgregarObra';
import EliminarObra from '../../components/ModalAmin/EliminarObra';
import ModificarObra from '../../components/ModalAmin/ModificarObra';
import Obras from '../../API/Public/Obras'; // Simulación de API con datos de obras.

interface Obra {
  id: string;
  nombre: string;
  tematica: string;
  descripcion: string;
  fechaCreacion: string;
  escultor: string;
  escultorPais: string;
  escultorImagen: string;
  imagenes:  string[]; 
}

function TablaObras() {
    const [obras, setObras] = useState<Obra[]>([]);
    const [filteredObras, setFilteredObras] = useState<Obra[]>([]);
    const [obraElegida, setObraElegida] = useState<Obra | null>(null);

    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

    const [filters, setFilters] = useState({
      id: '', 
      nombre: '',
      tematica: '',
      descripcion: '',
      fechaCreacion: '',
      escultor: '',
      escultorPais: '',
      escultorImagen: '', 
      imagenes:  [''],  
    });

    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    useEffect(() => {
      setObras(Obras);
      setFilteredObras(Obras);
    }, []);

    useEffect(() => {
      setFilteredObras(
        obras.filter((obra) =>
          obra.id.toLowerCase().includes(filters.id.toLowerCase()) &&
          obra.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
          obra.descripcion.toLowerCase().includes(filters.descripcion.toLowerCase()) &&
          obra.fechaCreacion.includes(filters.fechaCreacion)
        )
      );
    }, [filters, obras]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFilters({
        ...filters,
        [name]: value,
      });
    };

    const handleDelete = (obra: Obra) => {
      setObraElegida(obra);
      onOpenDelete();
    };

    const handleConfirmarDelete = async () => {
      setObras((prevObras) =>
        prevObras.filter((m) => m !== obraElegida)
      );
      onCloseDelete();
    };

    const handleConfirmarAdd = async (imagen: string, titulo: string, descripcion: string, fechaCreacion: string) => {
      setObras((prevObras) => [
        ...prevObras,
        { id: (prevObras.length + 1).toString(), nombre: titulo, tematica: '', descripcion, fechaCreacion, escultor: '', escultorPais: '', escultorImagen: '', imagenes: [imagen] },
      ]);
      onCloseAdd();
    };

    const handleEditar = (obra: Obra) => {
      setObraElegida(obra);
      onOpenEdit();
    };

    const handleConfirmarEdit = async (imagen: string, titulo: string, descripcion: string, fechaCreacion: string) => {
      setObras((prevObras) =>
        prevObras.map((m) =>
          m === obraElegida
            ? { ...m, imagen, titulo, descripcion, fechaCreacion }
            : m
        )
      );
      onCloseEdit();
    };

    return (
      <>
        <Flex alignItems="center" justifyContent="center" flexDirection="column">
          <Flex justifyContent="center" mb={4} mt={4} gap={4}>
            <Button leftIcon={<AddIcon />} borderRadius={3} onClick={onOpenAdd}>Agregar Obra</Button>
            <Button onClick={() => setMostrarFiltros(!mostrarFiltros)} leftIcon={<SearchIcon />} borderRadius={3}>
              {mostrarFiltros ? 'Ocultar Filtros' : 'Filtrar'}
            </Button>
          </Flex>

          <Box bg="secundaryBg" p={6} boxShadow="md" w="80%">
            {obras.length > 0 ? (
              <Table variant="striped" colorScheme="secundaryBg" width="100%">
                <Thead>
                  {mostrarFiltros && (
                    <Tr>
                      <Th></Th>
                      <Th>
                        <Input
                          variant='flushed'
                          placeholder="Filtrar por título"
                          name="titulo"
                          value={filters.nombre}
                          onChange={handleFilterChange}
                        />
                      </Th>
                      <Th>
                        <Input
                          variant='flushed'
                          placeholder="Filtrar por descripción"
                          name="descripcion"
                          value={filters.descripcion}
                          onChange={handleFilterChange}
                        />
                      </Th>
                      <Th>
                        <Input
                          variant='flushed'
                          placeholder="Filtrar por fecha de creación"
                          name="fechaCreacion"
                          value={filters.fechaCreacion}
                          onChange={handleFilterChange}
                        />
                      </Th>
                      <Th></Th>
                    </Tr>
                  )}

                  <Tr mt={8}>
                    <Th textAlign="center" fontSize={15}>Imagen</Th>
                    <Th textAlign="center" fontSize={15}>Título</Th>
                    <Th textAlign="center" fontSize={15}>Descripción</Th>
                    <Th textAlign="center" fontSize={15}>Fecha de Creación</Th>
                    <Th textAlign="center" fontSize={15}>Acciones</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {filteredObras.map((obra, index) => (
                    <Tr key={index}>
                      <Td textAlign="center" display="flex" justifyContent="center">
                        <Image src={obra.imagenes[0]} alt={obra.nombre} width="100px" height="100px" objectFit="contain" />
                      </Td>
                      <Td textAlign="center">{obra.nombre}</Td>
                      <Td textAlign="center">{obra.descripcion}</Td>
                      <Td textAlign="center">{obra.fechaCreacion}</Td>
                      <Td>
                        <Flex gap={2} justifyContent="center" alignItems="center">
                          <IconButton
                            aria-label="Editar"
                            icon={<EditIcon />}
                            variant="solid"
                            borderRadius={3}
                            onClick={() => handleEditar(obra)}
                          />
                          <IconButton
                            aria-label="Eliminar"
                            icon={<DeleteIcon />}
                            variant="solid"
                            borderRadius={3}
                            onClick={() => handleDelete(obra)}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text>No hay datos disponibles</Text>
            )}
          </Box>
        </Flex>

        <AgregarObra isOpen={isOpenAdd} onClose={onCloseAdd} confirmar={handleConfirmarAdd} />
        <EliminarObra isOpen={isOpenDelete} onClose={onCloseDelete} confirmar={handleConfirmarDelete} obra={obraElegida} />
        <ModificarObra isOpen={isOpenEdit} onClose={onCloseEdit} confirmar={handleConfirmarEdit} obra={obraElegida} />
      </>
    );
}

export default TablaObras;