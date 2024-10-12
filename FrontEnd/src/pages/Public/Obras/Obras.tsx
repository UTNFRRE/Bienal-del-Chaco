import {Box, CardBody, Card, Heading, Text,  SimpleGrid, Flex, Button} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Obras from '../../../API/Public/Obras';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export default function ObrasPublic () {

 const [obras, setObras] = useState<any[]>([]);
 const navigate = useNavigate(); // para poder navegar entre paginas

 // La idea es agregar un paginado, ya que la cantidad de obras puede ser muy grande, agrego un paginado de 9 en 9
 // Los request se van a ir haciendo de a 9, y se va a ir mostrando de a 9, tdv no funciona pq no esta la api
 const [offset, setOffset] = useState(0);
  const [limit] = useState(9);
  const [totalCount, setTotalCount] = useState(0);

    // Aca va el request a la api, cada vez que cambian el limite y el offset vuelvo a hacer el request para esos valores
    useEffect (() => {
        setObras(Obras);
        setTotalCount(Obras.length);
    }, [offset, limit]);

    const handleNextPage = () => {
        if (offset + limit < totalCount) {
          setOffset(offset + limit);
        }
      };
    
      const handlePreviousPage = () => {
        if (offset > 0) {
          setOffset(offset - limit);
        }
      };

      const handleCardClick = (id: number) => {
        navigate(`/public/obras/${id}`);
      };

    return (
        <Box p={4} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {/* Como las imagenes estan en un arreglo, para usar el carrusel react pide que esten en un json con las llaves original y thumbnail. Entonces por cada obra se crea ese json */}
            {obras.map((obra) => {
            const images = obra.imagenes.map((img: string) => ({
                original: img,
                thumbnail: img,
            }));
            return (
                <React.Fragment key={obra.id}>   
                 {/* Como hay elementos que se renderizan dentro de otro elemento (carrusel dentro de la card) se usa esa tag para evitar errores */}
                   <Card bgColor={"secundaryBg"} 
                    sx={{
                        transition: 'transform 0.3s ease', 
                        '&:hover': {
                        transform: 'scale(1.05)',
                        cursor: 'pointer', 
                        },
                     }}
                      borderWidth={2}  borderColor={"secundaryHover"}>
        
                        <CardBody   borderRadius={10} w="100%" h="100%" display="flex" flexDirection={"column"} >
                        <Box display="flex" justifyContent="center" alignItems="center" w="100%" mb={4}>
                        <ImageGallery items={images} 
                            showThumbnails={false}  //desactivo las miniaturas
                            showPlayButton={false}  // desactivo el boton de play
                            showFullscreenButton={false}  // desactivo el boton de pantalla completa
                            autoPlay={true} //activo para que arranquen solas
                            slideInterval={4000 + obra.id*100} //cada cuanto cambia, 4seg
                        /> 
                        </Box>
                        <Box w="100%" textAlign="left" display="flex" flexDirection={"column"} gap={0} onClick={() => handleCardClick(obra.id)}>
                            <Heading>{obra.nombre}</Heading>
                            <Text as={"i"} >{obra.tematica}</Text>
                            <Text as={"kbd"}>{obra.escultor}</Text>
                        </Box>
                        <Box onClick={() => handleCardClick(obra.id)}>
                        <Text noOfLines={3} mt={3}> {obra.descripcion}</Text>
                        </Box>
                        </CardBody>
                    </Card>
                </React.Fragment>
            );
        })}
        </SimpleGrid>
        {/* <Box justifyContent={"center"} bottom="0" width="90%" bg="white" p="10px" mt={7} boxShadow="md">
        <Flex justifyContent="space-between">
          <Button onClick={handlePreviousPage} isDisabled={offset === 0}>
            Anterior
          </Button>
          <Text>Página {Math.ceil(offset / limit) + 1} de {Math.ceil(totalCount / limit)}</Text>
          <Button onClick={handleNextPage} isDisabled={offset + limit >= totalCount} >
            Siguiente
          </Button>
        </Flex>
        </Box> */}
        </Box>
    )
}