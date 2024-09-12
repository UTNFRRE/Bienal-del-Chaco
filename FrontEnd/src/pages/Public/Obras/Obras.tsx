import {Box, CardBody, Card, Heading, Text,  SimpleGrid, Flex, Button} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Obras from '../../../API/Public/Obras';
import React from 'react';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

export default function ObrasPublic () {

 const [obras, setObras] = useState<any[]>([]);

 useEffect (() => {
        setObras(Obras);
    }, []);


    return (
        <Box p={4}>
        <Flex>
        <Heading 
            size="2xl" 
            fontFamily="'Mukta', serif" 
            fontWeight="600" 
            color="gray.700" 
            textAlign="left" 
            mb="5">
        Obras Seleccionadas
        </Heading>
        </Flex>
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
                   <Card bgGradient="" sx={{
                        transition: 'transform 0.3s ease', 
                        '&:hover': {
                        transform: 'scale(1.05)',
                        cursor: 'pointer', 
                        },
                     }}>
        
                        <CardBody borderWidth={2} w="100%" h="100%" display="flex" flexDirection={"column"}>
                        <Box display="flex" justifyContent="center" alignItems="center" w="100%" mb={4}>
                        <ImageGallery items={images} 
                            showThumbnails={false}  //desactivo las miniaturas
                            showPlayButton={false}  // desactivo el boton de play
                            showFullscreenButton={false}  // desactivo el boton de pantalla completa
                            autoPlay={true} //activo para que arranquen solas
                            slideInterval={4000} //cada cuanto cambia, 4seg
                        /> 
                        </Box>
                        <Box w="100%" textAlign="left" display="flex" flexDirection={"column"} gap={0}>
                            <Heading>{obra.nombre}</Heading>
                            <Text as={"i"} >{obra.tematica}</Text>
                            <Text as={"kbd"}>{obra.escultor}</Text>
                        </Box>
                        <Box>
                        <Text noOfLines={3} mt={3}> {obra.descripcion}</Text>
                        </Box>
                        </CardBody>
                    </Card>
                </React.Fragment>
            );
        })}
        </SimpleGrid>
        </Box>
    )
}