import { Grid, GridItem, Image, Text, Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import { getEscultorById } from '../../../API/Admin/Escultores';
import { getObraByEscultor } from '../../../API/Admin/Obras';


interface Escultor {
    id: number;
    nombre: string;
    apellido:string;
    dni:string;
    pais: string;
    telefono:string
    //fechaNacimiento: string;
    //lugarNacimiento:string;
    //premios: string;
    //foto:string;
    biografia:string;
    foto:string;
  }

  interface Obra {
    id:number;
    nombre: string;
    descripcion: string;
    imagenes: string;
  }

  const json: Escultor = 
    {
      id: 1,
      nombre: "Juan",
      apellido:"Bernardi",
      dni:"34343434",
      pais: "Argentina",
      telefono:"2222222",
      //fechaNacimiento: string;
      //lugarNacimiento:string;
      //premios: string;
      //foto:string;
      biografia:"Un pelado hincha de boca",
      foto:"https://www.bienaldelchaco.org/2024/wp-content/uploads/2024/04/Foto-Luis-Bernardi.png"
    };
 
    const json2: Obra[] = [
      {
        id:1,
        nombre: "La Mona Pija",
        descripcion: "Una obra de arte",
        imagenes: "https://pxcdn.ellitoral.com.ar/litoral/072024/1721955500242.jpg?cw=1200&ch=1172"
      },
      {
        id:1,
        nombre: "La Mona Pija",
        descripcion: "Una obra de arte",
        imagenes: "https://pxcdn.ellitoral.com.ar/litoral/072024/1721955500242.jpg?cw=1200&ch=1172"
      },
      {
        id:1,
        nombre: "La Mona Pija",
        descripcion: "Una obra de arte",
        imagenes: "https://pxcdn.ellitoral.com.ar/litoral/072024/1721955500242.jpg?cw=1200&ch=1172"
      },
      {
        id:1,
        nombre: "La Mona Pija",
        descripcion: "Una obra de arte",
        imagenes: "https://pxcdn.ellitoral.com.ar/litoral/072024/1721955500242.jpg?cw=1200&ch=1172"
      },
      {
        id:1,
        nombre: "La Mona Pija",
        descripcion: "Una obra de arte",
        imagenes: "https://pxcdn.ellitoral.com.ar/litoral/072024/1721955500242.jpg?cw=1200&ch=1172"
      }
    ];

const EscultorDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [obra, setObra] = useState<Obra[]>([]);
    const [escultor, setEscultor] = useState<Escultor>({
        id:  0,
        nombre:  '',
        apellido:  '',
        dni: '',
        pais:  '',
        telefono: '',
        biografia:  '',
        foto: '',
      });

      useEffect(() => {
        setEscultor(json);
        setObra(json2);
      }, []);
/*
      useEffect (() => {
        const fetchEscultorById = async (id?: string) => {
        try {
          if (!id) return;
          const data = await getEscultorById(id);
          setEscultor(data);
          const data2 = await getObraByEscultor(id);
          setObra(data2);
          console.log(data2)
        }
        catch (error) {
          console.error('Error en el fetch de la obra:', error);
        }
      }
      fetchEscultorById(id);
      }, [id]);
*/
  
    return (
        <Grid w={"100%"} h={"100vh"} templateColumns={"1fr 1fr"} templateRows={"1fr 1fr"} border={"3px solid black"} >
            <GridItem backgroundColor={"lightyellow"}>
                <Box display="flex" alignItems="center" w={"100%"} h={"100%"}>
     
                    <Box w={"45%"} h={"60%"}> 
                        <Image src={escultor.foto} h={"100%"} w={"100%"}/>
                    </Box>
    
                    <Box w={"45%"} h={"60%"} p={8}> 
                        <Text>{escultor.nombre}</Text>
                        <Text>{escultor.apellido}</Text>
                        <Text>{escultor.dni}</Text>
                        <Text>{escultor.pais}</Text>
                        <Text>{escultor.telefono}</Text>
                        <Text>{escultor.biografia}</Text>
                    </Box>

                 </Box>
  </GridItem>
              
            <GridItem backgroundColor={"lightgreen"}>
                <Text> Premios </Text>
            </GridItem>

            
       {obra.map((o) => {
                return (
                  <React.Fragment key={o.id}> 
            <GridItem backgroundColor={"lightblue"} colSpan={2} display="flex" alignItems="center" justifyContent={"center"}>  
              <Box display="flex" alignItems="center" w={"100%"} h={"100%"}>

              <Box w={"45%"} h={"60%"} p={8}> 
                <Image src={o.imagenes} h={"100%"} w={"100%"}/>
              </Box>


              <Box w={"45%"} h={"60%"} pl={2} pt={8}> 
                <Text>{o.nombre}</Text>
                <Text>{o.descripcion}</Text>
              </Box>

                </Box>
            </GridItem>
            
            </React.Fragment>
                )
          })}
          



        </Grid>


    );
};
export default EscultorDetail;
