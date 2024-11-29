// Objective: Create a page to manage the works of the artists.
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
    Icon,
  } from '@chakra-ui/react';
  import {
    EditIcon,
    DeleteIcon,
    AddIcon,
    SearchIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
  } from '@chakra-ui/icons';
  import { BsQrCode } from "react-icons/bs";
  import { useState, useEffect } from 'react';
  import { useDisclosure } from '@chakra-ui/react';
  import { useEdicion } from '../../EdicionContexto';
  import ModalQR from '../../components/Modal/ModalQR';
  import {getObras} from '../../API/Admin/Obras';
  
  interface Obra {
    esculturaId: string;
    nombre: string;
    tematica: string;
    descripcion: string;
    fechaCreacion: string;
    escultorNombre: string;
    escultorPais: string;
    escultorImagen: string;
    imagenes: string;
  }
  
  function TablaObrasQR() {
    const [obras, setObras] = useState<Obra[]>([]);
    const [obraElegida, setObraElegida] = useState<Obra | null>(null);
    const {edicion} = useEdicion();
    const [filter, setFilter] = useState('');
    const [showInput, setShowInput] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // Cantidad de obras por página
    const [totalPages, setTotalPages] = useState(2);
    const {
      isOpen: isOpenQR,
      onOpen: onOpenQR,
      onClose: onCloseQR,
    } = useDisclosure();
  
  
    //Modifique para conincide los tipos entre el file Obras y el tipo Obra
    useEffect(() => {
      const fetchObras = async () => {
        try {
          const data = await getObras(currentPage, pageSize, edicion, filter);
          console.log(data);
          setObras(data);
        } catch (error) {
          console.error('Error en el fetch de obras:', error);
        }
      };
  
      fetchObras();
    }, [currentPage, pageSize, edicion, filter]);
  
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(event.target.value);
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
  
    const handleQR = (obra: Obra) => {
      setObraElegida(obra);
      onOpenQR();
    };
  
    return (
      <>
        <Flex alignItems="center" flexDirection="column">
          <Flex justifyContent="center"  alignItems={"center"} w={"50%"} mb={4} mt={4} gap={4}>
            <SearchIcon
                w={6}
                h={6}
                color="primary"
            />
            <Input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Buscar por Titulo, Tematica o Descripcion..."
              w={"60%"}
              borderColor={"secundaryHover"}
              borderWidth={1}
              backgroundColor={"secundaryBg"}
              variant={"outline"}
              
            />
          </Flex>
          <Box
            overflowX="auto"
            bg="secundaryBg"
            p={6}
            boxShadow="md"
            w="80%"
            borderWidth={1}
            borderColor={'secundaryHover'}
          >
            {obras.length > 0 ? (
              <>
                <Table
                  variant="striped"
                  colorScheme="secundaryBg"
                  width="100%"
                  size="sm"
                >
                  <Thead>
  
                    <Tr mt={8}>
                      <Th textAlign="center" fontSize={15}>
                        Imagen
                      </Th>
                      <Th textAlign="center" fontSize={15}>
                        Título
                      </Th>
                      <Th textAlign="center" fontSize={15}>
                        Escultor
                      </Th>
                      <Th textAlign="center" fontSize={15}>
                        Acciones
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {obras.map((obra, index) => (
                      <Tr key={index} mt={1} mb={1} p={1}>
                        <Td
                          textAlign="center"
                          display="flex"
                          justifyContent="center"
                        >
                          <Image
                            src={`${obra.imagenes}?${new Date().getTime()}`}
                            alt={obra.nombre}
                            width="100px"
                            height="auto"
                            maxHeight="150px"
                            objectFit="contain"
                          ></Image>
                        </Td>
                        <Td textAlign="center">{obra.nombre}</Td>
                        <Td textAlign="center">{obra.escultorNombre}</Td>
                        <Td>
                          <Flex
                            gap={2}
                            justifyContent="center"
                            alignItems="center"
                          >
                            <IconButton
                              aria-label="QR"
                              icon={<BsQrCode />}
                              variant="bienal"
                              borderRadius={3}
                              onClick={() => handleQR(obra)}
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
          <Box w={'80%'} mb={4}>
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
        <ModalQR
          isOpen={isOpenQR}
          onClose={onCloseQR}
          obra={obraElegida?.nombre || ''}
          urlcodigo={`https://github.com/UTNFRRE/Bienal-del-Chaco`}
        />
      </>
    );
  }
  
  export default TablaObrasQR;
  