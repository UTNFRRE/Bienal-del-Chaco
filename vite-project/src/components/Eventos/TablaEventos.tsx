import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text, IconButton, Button} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons'; 
import Eventos from '../../API/Eventos';
import {useState , useEffect} from 'react';


// Agregar paginacion

function TablaEventos () {

    const [eventos, setEventos] = useState<any[]>([]); //se usa una variable de estado para guardar los eventos

    useEffect(() => {
        setEventos(Eventos)   //esto se hace dentro de un useeffect para que se ejecute solo una vez, en este caso cuando se recarga la pagina
    }, [])

    const truncateText = (text:string, maxLength:number) => {
        if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
        <Flex justifyContent="center" mb={4} mt={4}>
            <Button leftIcon={<AddIcon />}>Agregar Evento</Button>
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
          <Table variant="striped" colorScheme="secundaryBg" width="100%">
            <Thead>
              <Tr>
                <Th textAlign="center">Titulo</Th>
                <Th textAlign="center">Lugar</Th>
                <Th textAlign="center">Tematica</Th>
                <Th textAlign="center">Descripcion</Th>
                <Th textAlign="center">Fecha</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {eventos.map((evento, index) => (
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
                            />
                            <IconButton
                                aria-label="Eliminar"
                                icon={<DeleteIcon />}
                                variant="delete"                                           
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
    )
    }
export default TablaEventos;