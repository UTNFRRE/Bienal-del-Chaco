import {Box, CardBody, Card, Heading, Text, Image, SimpleGrid} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Obras from '../../../API/Public/Obras';

export default function ObrasPublic () {

 const [obras, setObras] = useState<any[]>([]);

 useEffect (() => {
        setObras(Obras);
    }, []);

    return (
        <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {obras.map((obra) => (

        <Card key={obra.id}  bgGradient="" sx={{
            transition: 'transform 0.3s ease', 
            '&:hover': {
              transform: 'scale(1.05)',
              cursor: 'pointer', 
            },
          }}>
        
        <CardBody borderWidth={2} w="100%" h="100%" display="flex" flexDirection={"column"}>
        <Box display="flex" justifyContent="center" alignItems="center" w="100%" mb={4}>
            <Image src={obra.imagenes[0]} alt="imagen de la obra" />
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
        ))}
        </SimpleGrid>
        </Box>
    )
}