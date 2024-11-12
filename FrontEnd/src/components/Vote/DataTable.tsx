import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import {useEdicion} from '../../EdicionContexto'
import { getObras } from '../../API/Admin/Obras';


interface Obra {
    esculturaId: number,
    nombre: string,
    tematica: string,
    descripcion: string,
    escultorId: number,
    fechaCreacion: string,
    esculturNombre: string,
    escultorPais: string,
    imagenes: string[],
    promedioVotos: number
}

const DataTable = ( ) => {
    // Define los datos que se van a mostrar en la tabla
    const [porcentaje,setPorcentaje] = useState <{[key:number]: number}> ({});
    const [Obras, setObras] = useState<Obra[]>([]);
    const [sortedObras, setSortedObras] = useState(Obras);
    const [refresh, setRefresh] = useState(false);
    const [currentPage] = useState(1);
    const [pageNumber] = useState(10);
    const {edicion} = useEdicion();

    //Llamada a la API para obtener los datos de las obras
    useEffect(() => {
        const fetchObras = async () => {
            try{
                const datos = await getObras(currentPage, pageNumber, edicion);
                console.log(datos);
                setObras(datos);
                setRefresh(!refresh);
            } catch(error){
                console.log("error al solicitar obras",error);
            }
        };
        fetchObras();
        
    }, [edicion,]);


    useEffect(() => {
        // Ordenar las obras de mayor a menor según su cantidad de votos
        const sorted = [...Obras].sort((a, b) => b.promedioVotos - a.promedioVotos);
        setSortedObras(sorted);

        const totalVotes = sortedObras.reduce((sum, item)=> sum + item.promedioVotos, 0);
        const porcentajes = sortedObras.reduce((acc, item)=>{
            acc[item.esculturaId] = (item.promedioVotos / totalVotes) * 100;
            return acc;
        }, {} as {[key: number]: number});
        setPorcentaje(porcentajes);
        setRefresh(!refresh);
    }, [edicion,refresh,]);

    return (
        <Table size="sm">
            <Thead>
                <Tr>
                    <Th>Obra</Th>
                    <Th>Promedio de puntuacion</Th>
                    <Th>%</Th>
                </Tr>
            </Thead>
            <Tbody>
                {Obras.length === 0 ? (
                    <Tr>
                        <Td colSpan={3} textAlign="center">No hay esculturas</Td>
                    </Tr>
                ) : (
                    <>
                        {sortedObras.map((item) => (
                            <Tr key={item.esculturaId} _hover={{ bg: 'gray.100' }}>
                                <Td>{item.nombre}</Td>
                                <Td>{item.promedioVotos}</Td>
                                <Td>{porcentaje[item.esculturaId]?.toFixed(2)}</Td>
                            </Tr>
                        ))}
                        <Tr>
                            <Td>Total</Td>
                            <Td>{Obras.reduce((sum, item) => sum + item.promedioVotos, 0)}</Td>
                            <Td>100</Td>
                        </Tr>
                    </>
                )}
            </Tbody>
        </Table>
    );
}

export default DataTable;