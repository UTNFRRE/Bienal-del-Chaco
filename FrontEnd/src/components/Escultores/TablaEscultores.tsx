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
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import ModalConfirmar from '../Modal/ConfirmarCambios';
import ModalAgregarEscultor from '../Modal/AgregarEscultor';
import ModalEditarEscultor from '../Modal/EditarEscultor';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useEdicion } from '../../EdicionContexto';

import {
  getEscultor,
  addEscultor,
  deleteEscultor,
  editEscultor,
} from '../../API/Admin/Escultores';

interface Escultor {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  pais: string;
  telefono: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  premios: string;
  foto: string ;
}

function TablaEscultores() {
  const [Escultores, setEscultores] = useState<Escultor[]>([]);
  const [EscultorElegido, setEscultorElegido] = useState<Escultor>();
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Cantidad de obras por página
  const [totalPages, setTotalPages] = useState(2);
  const [filter, setFilter] = useState('');
  const [showInput, setShowInput] = useState(false);
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
    const fetchEscultores = async () => {
      try {
        const data = await getEscultor(currentPage, pageSize, filter, edicion);
        console.log(data);
        setEscultores(data);
      } catch (error) {
        console.error('Error en el fetch de escultores:', error);
      }
    };

    fetchEscultores();
  }, [refresh, currentPage, pageSize, filter, edicion]);

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

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
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
    foto : File,
    pais: string,
    contacto: string,
    fechaNacimiento: string,
    lugarNacimiento: string,
    premios: string,
    edicionAño: string
  ) => {
    const PostEscultor = async () => {
      try {
        await addEscultor(nombre, pais, contacto, fechaNacimiento, lugarNacimiento, premios, edicionAño, foto);
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
    foto: string | File,
    nombre: string,
    pais: string,
    contacto: string,
    fechaNacimiento: string,
    lugarNacimiento: string,
    premios: string,
    edicionAño: string
  ): Promise<void> => {
    const PutEscultor = async () => {
      try {
        if (EscultorElegido) {
          await editEscultor(
            EscultorElegido.id.toString(),
            nombre,
            pais,
            contacto,
            fechaNacimiento,
            lugarNacimiento,
            premios,
            edicionAño,
            foto,
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
        <Flex justifyContent="center" mb={4} mt={4} gap={4} w={"50%"}>
          <Button
            variant="bienal"
            leftIcon={<AddIcon />}
            borderRadius={3}
            onClick={onOpenAdd}
          >
            Agregar Escultor
          </Button>
          <IconButton
          aria-label="Buscar"
          icon={<SearchIcon />}
          variant="bienal"
          onClick={() => setShowInput(!showInput)}
          />
          {showInput && (
          <Input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Buscar por Nombre y Apellido, DNI o Pais..."
            w={"60%"}
            borderColor={"secundaryHover"}
            borderWidth={1}
            backgroundColor={"secundaryBg"}
            variant={"outline"}
            mb={4}
          />
          )}
        </Flex>
        <Box
          bg="secundaryBg"
          p={5}
          boxShadow="md"
          w="80%"
          borderWidth={1}
          borderColor={'secundaryHover'}
        >
          {Escultores.length > 0 ? (
            <Box overflowX="auto" w={'100%'}>
              <Table
                style={{ width: '100%' }}
                colorScheme="secundaryBg"
                width="100%"
              >
                <Thead>
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
                  {Escultores.map((escultor, index) => (
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
                        {escultor.telefono}
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
          <Box w={'80%'}>
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
      <ModalEditarEscultor
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        confirmar={handleConfirmarEdit}
        escultor={EscultorElegido}
      />
    </>
  );
}
export default TablaEscultores;
