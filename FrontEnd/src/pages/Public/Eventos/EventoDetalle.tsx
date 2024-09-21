import  Eventos from '../../../API/Admin/Eventos' // Adjust the path to where your events data is located
import { useParams } from "react-router-dom"
import {Flex} from '@chakra-ui/react'

interface Evento {
    id: number;
    titulo: string;
    fecha: string;
    descripcion: string;
    lugar: string;
    tematica: string;
  }  

export default function EventoDetalle() {
    const { id } = useParams<{ id: string }>();

    const evento = Eventos.find((evento: Evento) => evento.id === Number(id));

    return (
        <Flex direction={"column"} gap={10}>
            <h1>{evento?.titulo}</h1>
            <p>{evento?.fecha}</p>
            <p>{evento?.descripcion}</p>
            <p>{evento?.lugar}</p>
            <p>{evento?.tematica}</p>
        </Flex>
    )
}