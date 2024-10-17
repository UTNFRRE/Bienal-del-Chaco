import { Grid, GridItem, Image, Text, Box } from '@chakra-ui/react'
import { useParams } from 'react-router-dom';


const EscultorDetail = () => {
    const { id } = useParams<{ id: string }>();

    const escultor = 
    {
      id: 1,
      nombre: "Luis Bernardi",
      fechaNacimiento: "23-09-1965",
      lugarNacimiento: "Monte Caseros, Corrientes",
      premios: "Children’s Award: “Reinaldo Martinez”, Audience Award: “Juan Alberto García”, Mention “Airports Argentina”",
      obras: "obra1, obra2",
      foto: "https://www.republicadecorrientes.com/content/bucket/4/66054w695h513c.jpg.webp"
    };
  
    return (
        <Grid w={"100%"} h={"100vh"} templateColumns={"1fr 1fr"} templateRows={"1fr 1fr"} border={"3px solid black"} >
            <GridItem backgroundColor={"lightyellow"}>
                <Box display="flex" alignItems="center" w={"100%"} h={"100%"}>
     
                    <Box w={"45%"} h={"60%"}> 
                        <Image src={escultor.foto} h={"100%"} w={"100%"}/>
                    </Box>
    
                    <Box w={"45%"} h={"60%"} p={8}> 
                        <Text>{escultor.nombre}</Text>
                        <Text>{escultor.fechaNacimiento}</Text>
                        <Text>{escultor.lugarNacimiento}</Text>
                        <Text>{escultor.id}</Text>
                    </Box>

                 </Box>
  </GridItem>
            <GridItem backgroundColor={"lightblue"} display="flex" alignItems="center" justifyContent={"center"}>
                <Text> Premios </Text>
            </GridItem>
            <GridItem backgroundColor={"lightgreen"} colSpan={2} display="flex" alignItems="center" justifyContent={"center"}>
                <Text> Obras </Text>
            </GridItem>
           



        </Grid>


    );

};
export default EscultorDetail;