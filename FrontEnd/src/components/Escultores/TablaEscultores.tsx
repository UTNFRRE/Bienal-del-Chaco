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
  Image,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import TEscultores from '../../API/TEscultores';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import ModalConfirmar from '../Modal/ConfirmarCambios';
import ModalAgregarEscultor from '../Modal/AgregarEscultor';
import ModalEditarEscultor from '../Modal/EditarEscultor';

import {
  getEscultor,
  addEscultor,
  deleteEscultor,
  editEscultor,
} from '../../API/Admin/Escultores';

interface Escultor {
  id: number;
  nombre: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  premios: string;
  foto: string;
  pais: string;
  contacto: string;
}

function TablaEscultores() {
  const [escultores, setEscultores] = useState<Escultor[]>([]);
  const [filteredEscultor, setFilteredEscultor] = useState<Escultor[]>([]);
  const [EscultorElegido, setEscultorElegido] = useState<Escultor>();
  const [refresh, setRefresh] = useState(false);

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

  const [filters, setFilters] = useState({
    foto: '',
    nombre: '',
    pais: '',
    contacto: '',
    fechaNacimiento: '',
    lugarNacimiento: '',
    premios: '',
  });
  const [MostrarFiltros, setMostrarFiltros] = useState(false);

  useEffect(() => {
    const fetchEscultores = async () => {
      try {
        const data = await getEscultor();
        console.log(data);
        setEscultores(data);
        setFilteredEscultor(data);
      } catch (error) {
        console.error('Error en el fetch de escultores:', error);
      }
    };

    fetchEscultores();
  }, [refresh]);

  //  useEffect(() => {
  //    setFilteredEscultor(
  //      escultores.filter(escultor =>
  //          escultor.foto.toLowerCase().includes(filters.foto.toLowerCase()) &&
  //          escultor.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
  //          escultor.pais.toLowerCase().includes(filters.pais.toLowerCase()) &&
  //          escultor.contacto.toLowerCase().includes(filters.contacto.toLowerCase()) &&
  //          escultor.fechaNacimiento.toLowerCase().includes(filters.fechaNacimiento.toLowerCase()) &&
  //          escultor.lugarNacimiento.toLowerCase().includes(filters.lugarNacimiento.toLowerCase()) &&
  //          (Array.isArray(escultor.premios) ? escultor.premios.join(', ') :
  //          (escultor.premios || '')).toLowerCase().includes(filters.premios.toLowerCase())
  //      )
  //      );
  //  }, [filters, escultores]);

  // funcion para manejar los cambios en los filtros
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleDelete = (escultor: Escultor) => {
    setEscultorElegido(escultor);
    onOpenDelete();
  };

  //const handleConfirmarDelete = async () => {
  //    setEscultores((prevEscultores) =>
  //        prevEscultores.filter((m) => m !== EscultorElegido)
  //     );

  //    onCloseDelete();
  // };

  const handleConfirmarDelete = async () => {
    const DeleteEscultor = async () => {
      try {
        if (EscultorElegido) {
          await deleteEscultor(EscultorElegido.id.toString());
          setRefresh(!refresh);
        }
      } catch (error) {
        console.error('Error en el fetch de escultores:', error);
      }
    };
    DeleteEscultor();
    onCloseDelete();
  };

  // const handleConfirmarAdd = async (foto:string, nombre:string, pais:string, contacto:string, fechaNacimiento:string, lugarNacimiento:string, premios:string) => {
  // Aca se hace el llamado a la funcion de la api que agrega un escultor
  // Agregar el escultor al json
  //setEscultores((prevEscultores) => [
  //  ...prevEscultores,
  //  {
  //      foto: foto,
  //      nombre: nombre,
  //      pais: pais,
  //      contacto: contacto,
  //      fechaNacimiento: fechaNacimiento,
  //      lugarNacimiento: lugarNacimiento,
  //      premios: premios,
  //  },
  //  ]);
  //  onCloseAdd();
  //    };

  const handleConfirmarAdd = async (
    nombre: string,
    foto: File,
    Pais: string,
    contacto: string
  ) => {
    const PostEscultor = async () => {
      try {
        await addEscultor(nombre, foto, Pais, contacto);
        setRefresh(!refresh);
      } catch (error) {
        console.error('Error en el fetch de escultores:', error);
      }
    };
    PostEscultor();
    onCloseAdd();
  };

  const handleEditar = (escultor: any) => {
    setEscultorElegido(escultor);
    onOpenEdit();
  };

  //const handleConfirmarEdit = async (foto:string, nombre:string, pais:string, contacto:string, fechaNacimiento:string, lugarNacimiento:string, premios:string) => {
  // Aca se hace el llamado a la funcion de la api que edita un escultor
  // Edita el escultor en el json
  //   setEscultores((prevEscultores) =>
  //       prevEscultores.map((m) =>
  //       m === EscultorElegido
  //           ? {
  //               ...m,
  //               foto: foto,
  //               nombre: nombre,
  //              pais: pais,
  //                contacto: contacto,
  //                fechaNacimiento: fechaNacimiento,
  //                lugarNacimiento: lugarNacimiento,
  //                premios: premios,
  //            }
  //            : m
  //       )
  //   );
  //   onCloseEdit();
  //   };

  const handleConfirmarEdit = async (
    Nombre: string,
    fechaNacimiento: string,
    lugarNacimiento: string,
    premios: string,
    obras: string,
    foto: File | string
  ) => {
    const PutEscultor = async () => {
      try {
        if (EscultorElegido) {
          await editEscultor(
            EscultorElegido.id.toString(),
            Nombre,
            fechaNacimiento,
            lugarNacimiento,
            premios,
            obras,
            foto
          );
        }
      } catch (error) {
        console.error('Error en el fetch de escultores:', error);
      }
    };
    PutEscultor();
    onCloseEdit();
  };

  return (
    <>
      <Flex alignItems="center" justifyContent="center" flexDirection="column">
        <Flex justifyContent="center" mb={4} mt={4} gap={4}>
          <Button
            variant="bienal"
            leftIcon={<AddIcon />}
            borderRadius={3}
            onClick={onOpenAdd}
          >
            Agregar Escultor
          </Button>
          <Button
            variant="bienal"
            onClick={() => setMostrarFiltros(!MostrarFiltros)}
            leftIcon={<SearchIcon />}
            borderRadius={3}
          >
            {MostrarFiltros ? 'Ocultar Filtros' : 'Filtrar'}
          </Button>
        </Flex>
        <Box
          bg="secundaryBg"
          p={5}
          boxShadow="md"
          w="87%"
          borderWidth={1}
          borderColor={'secundaryHover'}
        >
          {escultores.length > 0 ? (
            <Box overflowX="auto" w={'100%'}>
              <Table
                style={{ width: '100%' }}
                colorScheme="secundaryBg"
                width="100%"
              >
                {' '}
                {/*variant="striped"*/}
                <Thead>
                  {/* Si MostrarFiltros es verdadero entonces... */}
                  {MostrarFiltros && (
                    <Tr>
                      <Th></Th>
                      <Th>
                        <Input
                          variant="flushed"
                          fontSize={13}
                          placeholder="Filtrar por nombre"
                          name="nombre"
                          value={filters.nombre}
                          onChange={handleFilterChange}
                        />
                      </Th>
                      <Th>
                        <Input
                          variant="flushed"
                          fontSize={13}
                          placeholder="Filtrar por pais"
                          name="pais"
                          value={filters.pais}
                          onChange={handleFilterChange}
                        />
                      </Th>
                      <Th>
                        <Input
                          variant="flushed"
                          fontSize={13}
                          placeholder="Filtrar por contacto"
                          name="contacto"
                          value={filters.contacto}
                          onChange={handleFilterChange}
                        />
                      </Th>
                      <Th>
                        <Input
                          variant="flushed"
                          fontSize={13}
                          placeholder="Filtrar por fechaNacimiento"
                          name="fechaNacimiento"
                          value={filters.fechaNacimiento}
                          onChange={handleFilterChange}
                        />
                      </Th>
                      <Th>
                        <Input
                          variant="flushed"
                          fontSize={13}
                          placeholder="Filtrar por lugarNacimiento"
                          name="lugarNacimiento"
                          value={filters.lugarNacimiento}
                          onChange={handleFilterChange}
                        />
                      </Th>
                      <Th>
                        <Input
                          variant="flushed"
                          fontSize={13}
                          placeholder="Filtrar por premios"
                          name="premios"
                          value={filters.premios}
                          onChange={handleFilterChange}
                        />
                      </Th>
                    </Tr>
                  )}
                  <Tr mt={8}>
                    <Th p={2} textAlign="center" fontSize={13} width="10%">
                      Foto
                    </Th>
                    <Th p={2} textAlign="center" fontSize={13}>
                      Nombre
                    </Th>
                    <Th p={2} textAlign="center" fontSize={13}>
                      Pais
                    </Th>
                    <Th p={2} textAlign="center" fontSize={13}>
                      Contacto
                    </Th>
                    <Th p={2} textAlign="center" fontSize={13}>
                      FechaNacimiento
                    </Th>
                    <Th p={2} textAlign="center" fontSize={13}>
                      LugarNacimiento
                    </Th>
                    <Th p={2} textAlign="center" fontSize={13}>
                      Premios
                    </Th>
                    <Th p={2} textAlign="center" fontSize={13}>
                      Acciones
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredEscultor.map((escultor, index) => (
                    <Tr key={index}>
                      <Td p={2} textAlign="center">
                        <Image
                          src={escultor.foto}
                          alt={escultor.nombre}
                          boxSize={['90px']}
                          //width="80px"
                          //height="80px"
                          objectFit="cover"
                          borderRadius="full"
                        />
                      </Td>
                      <Td p={2} textAlign="center" fontSize={14}>
                        {escultor.nombre}
                      </Td>
                      <Td p={2} textAlign="center" fontSize={14}>
                        {escultor.pais}
                      </Td>
                      <Td p={2} textAlign="center" fontSize={14}>
                        {escultor.contacto}
                      </Td>
                      <Td p={2} textAlign="center" fontSize={14}>
                        {escultor.fechaNacimiento}
                      </Td>
                      <Td p={2} textAlign="center" fontSize={14}>
                        {escultor.lugarNacimiento}
                      </Td>
                      <Td p={1} textAlign="center" fontSize={13} maxWidth={300}>
                        {escultor.premios}
                      </Td>
                      <Td p={2}>
                        <Flex
                          gap={2}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <IconButton
                            aria-label="Editar"
                            icon={<EditIcon />}
                            variant="bienal"
                            borderRadius={3}
                            onClick={() => handleEditar(escultor)}
                          />
                          <IconButton
                            aria-label="Eliminar"
                            icon={<DeleteIcon />}
                            variant="delete"
                            borderRadius={3}
                            onClick={() => handleDelete(escultor)}
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
        texto={`¿Estás seguro que deseas eliminar a ${EscultorElegido?.nombre}?`}
        confirmar={handleConfirmarDelete}
      />
      <ModalAgregarEscultor
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        confirmar={handleConfirmarAdd}
      />
      {/* <ModalEditarEscultor
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        confirmar={handleConfirmarEdit}
        escultor={EscultorElegido}
        /> */}
    </>
  );
}
export default TablaEscultores;
