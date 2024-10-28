// Objective: Create a page to manage the works of the artists.
import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, IconButton, Button, Input, Image } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon, ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import AgregarObra from '../../../components/Modal/AgregarObra';
import ModalConfirmar from '../../../components/Modal/ConfirmarCambios';
import ModificarObra from '../../../components/Modal/ModificarObra';
import Obras from '../../../API/Public/Obras'; // Simulación de API con datos de obras.

import { getObras, addObra, editObra, deleteObra } from '../../../API/Admin/Obras';

interface Obra {
  esculturaId: string;
  nombre: string;
  tematica: string;
  descripcion: string;
  fechaCreacion: string;
  escultorNombre: string;
  escultorPais: string;
  escultorImagen: string;
  imagenes:  string; 
}

function TablaObras() {
    const [obras, setObras] = useState<Obra[]>([]);
    const [filteredObras, setFilteredObras] = useState<Obra[]>([]);
    const [obraElegida, setObraElegida] = useState<Obra | null>(null);
    const [refresh, setRefresh] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // Cantidad de obras por página
    const [totalPages, setTotalPages] = useState(2);

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
    const {
      isOpen: isOpenDelete,
      onOpen: onOpenDelete,
      onClose: onCloseDelete,
    } = useDisclosure();

    const [filters, setFilters] = useState({
      id: '', 
      nombre: '',
      tematica: '',
      descripcion: '',
      escultor: '',
      fechaCreacion: '',
      escultorPais: '',
      escultorImagen: '', 
      imagenes:  [''],  
    });

    const [mostrarFiltros, setMostrarFiltros] = useState(false);

    //Modifique para conincide los tipos entre el file Obras y el tipo Obra
    useEffect(() => {
      const fetchObras = async () => {
        try {
          const data = await getObras(currentPage, pageSize);
          console.log(data);
          setObras(data);
          setFilteredObras(data);
        } catch (error) {
          console.error('Error en el fetch de obras:', error);
        }
      };
    
      fetchObras();
    }, [refresh, currentPage, pageSize]);

    // useEffect(() => {
    //   setFilteredObras(
    //     obras.filter((obra) =>
    //       obra.id.toLowerCase().includes(filters.id.toLowerCase()) &&
    //       obra.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
    //       obra.descripcion.toLowerCase().includes(filters.descripcion.toLowerCase()) &&
    //       obra.escultor.toLowerCase().includes(filters.escultor.toLowerCase())
    //     )
    //   );
    // }, [filters, obras]);

    // const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const { name, value } = e.target;
    //   setFilters({
    //     ...filters,
    //     [name]: value,
    //   });
    // };

    const handleDelete = (obra: Obra) => {
      setObraElegida(obra);
      onOpenDelete();
    };

    const handleConfirmarDelete = async () => {

      const DeleteObra = async () => {
        try {
          if (obraElegida) {
            await deleteObra(obraElegida.esculturaId);
            setRefresh(!refresh);
          }
        } catch (error) {
          console.error('Error en el fetch de obras:', error);
        }
      };
      DeleteObra();
      onCloseDelete();
    };

    const handleConfirmarAdd = async (titulo:string, tematica:string, fecha:string, autor:number, paisAutor:string, descripcion:string, imagen:File ) => {
      
      const PostObra = async () => {
        try {
          await addObra(titulo, tematica, fecha, autor, paisAutor, descripcion, imagen);
          setRefresh(!refresh);
        } catch (error) {
          console.error('Error en el fetch de obras:', error);
        }
      };

      PostObra();
      onCloseAdd();
    };

    const handleEditar = (obra: Obra) => {
      setObraElegida(obra);
      onOpenEdit();
    };

    const handleConfirmarEdit = async (titulo:string, tematica:string, fecha:string, autor:number, paisAutor:string, descripcion:string, imagenes:string | File) => {
      
      const PutObra = async () => {
        try {
          if (obraElegida) {
            await editObra(obraElegida.esculturaId, titulo, tematica, fecha, autor, paisAutor, descripcion, imagenes);
          }
          setRefresh(!refresh);
        } catch (error) {
          console.error('Error en el fetch de obras:', error);
        }
      };

      PutObra();
      onCloseEdit();
    };

    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    return (
      <>
        <Flex alignItems="center"  flexDirection="column">
          <Flex justifyContent="center" mb={4} mt={4} gap={4}>
            <Button variant="bienal" leftIcon={<AddIcon />} borderRadius={3} onClick={onOpenAdd}>Agregar Obra</Button>
            <Button variant="bienal" onClick={() => setMostrarFiltros(!mostrarFiltros)} leftIcon={<SearchIcon />} borderRadius={3}>
              {mostrarFiltros ? 'Ocultar Filtros' : 'Filtrar'}
            </Button>
          </Flex>
          <Box overflowX="auto" bg="secundaryBg" p={6} boxShadow="md" w="80%" borderWidth={1} borderColor={"secundaryHover"}>  
            {obras.length > 0 ? (
              <>
              <Table variant="striped" colorScheme="secundaryBg" width="100%" size="sm">
                <Thead>
                  {/* {mostrarFiltros && (
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
                          placeholder="Filtrar por Escultor"
                          name="escultor"
                          value={filters.escultor}
                          onChange={handleFilterChange}
                        />
                      </Th>
                      <Th></Th>
                    </Tr>
                  )} */}

                  <Tr mt={8}>
                    <Th textAlign="center" fontSize={15}>Imagen</Th>
                    <Th textAlign="center" fontSize={15}>Título</Th>
                    <Th textAlign="center" fontSize={15}>Descripción</Th>
                    <Th textAlign="center" fontSize={15}>Escultor</Th>
                    <Th textAlign="center" fontSize={15}>Acciones</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredObras.map((obra, index) => (
                    <Tr key={index} mt={1} mb={1} p={1}>
                        <Td textAlign="center" display="flex" justifyContent="center">
                        <Image src={`${obra.imagenes}?${new Date().getTime()}`} alt={obra.nombre} width="100px" height="auto" maxHeight="150px" objectFit="contain"></Image>
                        </Td>
                      <Td textAlign="center">{obra.nombre}</Td>
                      <Td textAlign="center">{obra.descripcion}</Td>
                      <Td textAlign="center">{obra.escultorNombre}</Td>
                      <Td>
                        <Flex gap={2} justifyContent="center" alignItems="center">
                          <IconButton
                            aria-label="Editar"
                            icon={<EditIcon />}
                            variant="bienal"
                            borderRadius={3}
                            onClick={() => handleEditar(obra)}
                          />
                          <IconButton
                            aria-label="Eliminar"
                            icon={<DeleteIcon />}
                            variant="delete"
                            borderRadius={3}
                            onClick={() => handleDelete(obra)}
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
          <Box w={"80%"} mb={4}>
          <Flex justifyContent="flex-end" mt={4} gap={1}>
                <IconButton
                  aria-label="Previous Page"
                  icon={<ArrowLeftIcon />}
                  variant="bienal"
                  borderRadius={3}
                  onClick={() => handlePreviousPage()}
                  isDisabled={currentPage === 1}
                />
                <IconButton
                  aria-label="Next Page"
                  icon={<ArrowRightIcon />}
                  variant="bienal"
                  borderRadius={3}
                  onClick={() => handleNextPage()}
                  isDisabled={currentPage === totalPages}
                />
          </Flex>
          </Box>
        </Flex>

        <AgregarObra 
            isOpen={isOpenAdd}
            onClose={onCloseAdd}
            confirmar= {handleConfirmarAdd}
        />
        <ModificarObra 
              isOpen={isOpenEdit}
              onClose={onCloseEdit}
              confirmar = {handleConfirmarEdit}
              obra={obraElegida}
            />
          <ModalConfirmar 
              isOpen={isOpenDelete}
              onClose={onCloseDelete}
              texto={`¿Está seguro que desea eliminar la obra ${obraElegida?.nombre}?`}
              confirmar={handleConfirmarDelete}
          />
      </>
    );
}

export default TablaObras;