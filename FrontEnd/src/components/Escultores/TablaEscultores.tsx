import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, IconButton, Button, Input, Image} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from '@chakra-ui/icons';
import TEscultores from '../../API/TEscultores';
import {useState , useEffect} from 'react';
import { useDisclosure } from '@chakra-ui/react';
import ModalConfirmar from '../Modal/ConfirmarCambios';
import ModalAgregarEscultor from '../Modal/AgregarEscultor';
import ModalEditarEscultor from '../Modal/EditarEscultor';


function TablaEscultores () {


    const [escultores, setEscultores] = useState<any[]>([]);
    const [filteredEscultor, setFilteredEscultor] = useState<any[]>([]);
    const [EscultorElegido, setEscultorElegido] = useState<any>();
   
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
        foto:'',
        nombre:'',
        pais:'',
        contacto:''
    });
    const [MostrarFiltros, setMostrarFiltros] = useState(false);


    useEffect(() => {
        setEscultores(TEscultores)  
        setFilteredEscultor(TEscultores);
    }, [])

    useEffect(() => {
        setFilteredEscultor(
        escultores.filter(escultor =>
            escultor.foto.toLowerCase().includes(filters.foto.toLowerCase()) &&
            escultor.nombre.toLowerCase().includes(filters.nombre.toLowerCase()) &&
            escultor.pais.toLowerCase().includes(filters.pais.toLowerCase()) &&
            escultor.contacto.toLowerCase().includes(filters.contacto.toLowerCase())
        )
        );
    }, [filters, escultores]);
   
    // funcion para manejar los cambios en los filtros
    const handleFilterChange = (e:any) => {
        const { name, value } = e.target;
        setFilters({
        ...filters,
        [name]: value,
        });
    };

    const handleDelete = (escultor:any) => {
    setEscultorElegido(escultor);
    onOpenDelete()
    }


    const handleConfirmarDelete = async () => {
        setEscultores((prevEscultores) =>
            prevEscultores.filter((m) => m !== EscultorElegido)
        ); 


        onCloseDelete();
    };


    const handleConfirmarAdd = async (foto:string, nombre:string, pais:string, contacto:string) => {
      // Aca se hace el llamado a la funcion de la api que agrega un escultor
      // Agregar el escultor al json
    setEscultores((prevEscultores) => [
        ...prevEscultores,
        {
            foto: foto,
            nombre: nombre,
            pais: pais,
            contacto: contacto
        },
    ]);
    onCloseAdd();
    };

    const handleEditar = (escultor:any) => {
    setEscultorElegido(escultor);
    onOpenEdit();
    };

    const handleConfirmarEdit = async (foto:string, nombre:string, pais:string, contacto:string) => {
      // Aca se hace el llamado a la funcion de la api que edita un escultor
      // Edita el escultor en el json
    setEscultores((prevEscultores) =>
        prevEscultores.map((m) =>
        m === EscultorElegido
            ? {
                ...m,
                foto: foto,
                nombre: nombre,
                pais: pais,
                contacto: contacto
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
                <Button leftIcon={<AddIcon />} borderRadius={3} onClick={onOpenAdd}>Agregar Escultor</Button>
                <Button onClick={() => setMostrarFiltros(!MostrarFiltros)} leftIcon={<SearchIcon />} borderRadius={3}>
                {MostrarFiltros ? 'Ocultar Filtros' : 'Filtrar'}
                </Button>
            </Flex>
            <Box
                    bg="secundaryBg"
                    p={6}
                    boxShadow="md"
                    w="80%"
            >
            {escultores.length > 0 ? (
                <>
                <Table variant="striped" colorScheme="secundaryBg" width="100%">
                    <Thead>
                       {/* Si MostrarFiltros es verdadero entonces... */}
                    {MostrarFiltros && (
                        <Tr>
                        <Th>
                        </Th>
                        <Th>
                            <Input
                            variant='flushed'
                            placeholder="Filtrar por nombre"
                            name="nombre"
                            value={filters.nombre}
                            onChange={handleFilterChange}
                            />
                        </Th>
                        <Th>
                            <Input
                            variant='flushed'
                            placeholder="Filtrar por pais"
                            name="pais"
                            value={filters.pais}
                            onChange={handleFilterChange}
                                />
                        </Th>
                        <Th>
                            <Input
                            variant='flushed'
                            placeholder="Filtrar por contacto"
                            name="contacto"
                            value={filters.contacto}
                            onChange={handleFilterChange}
                            />
                        </Th>
                        <Th></Th>
                        </Tr>
                    )}
                    <Tr mt={8}>
                        <Th textAlign="center" fontSize={15}>Foto</Th>
                        <Th textAlign="center" fontSize={15}>Nombre</Th>
                        <Th textAlign="center" fontSize={15}>Pais</Th>
                        <Th textAlign="center" fontSize={15}>Contacto</Th>
                        <Th textAlign="center" fontSize={15}>Acciones</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {filteredEscultor.map((escultor, index) => (
                        <Tr key={index} >
                        <Td textAlign="center" display="flex" justifyContent="center" >
                        <Image 
                            src={escultor.foto} 
                            alt={escultor.nombre} 
                            width="100px" 
                            height="100%" 
                            objectFit="contain" 
                        />
                        </Td>
                        <Td textAlign="center">{escultor.nombre}</Td>
                        <Td textAlign="center">{escultor.pais}</Td>
                        <Td textAlign="center">{escultor.contacto}</Td>
                        <Td>
                            <Flex gap={2} justifyContent="center" alignItems="center">
                            <IconButton
                                aria-label="Editar"
                                icon={<EditIcon />}
                                variant="solid"
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
        )
    }
export default TablaEscultores;
