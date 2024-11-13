import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Obras from '../../API/ObrasVote';

const DataTable = ( ) => {
    // Define los datos que se van a mostrar en la tabla
    const [porcentaje,setPorcentaje] = useState <{[key:number]: number}> ({});
    const [sortedObras, setSortedObras] = useState(Obras);


    useEffect(() => {
        // Ordenar las obras de mayor a menor según su cantidad de votos
        const sorted = [...Obras].sort((a, b) => b.PromedioPuntuacion - a.PromedioPuntuacion);
        setSortedObras(sorted);

        const totalVotes = sortedObras.reduce((sum, item)=> sum + item.PromedioPuntuacion, 0);
        const porcentajes = sortedObras.reduce((acc, item)=>{
            acc[item.id] = (item.PromedioPuntuacion / totalVotes) * 100;
            return acc;
        }, {} as {[key: number]: number});
        setPorcentaje(porcentajes);
    }, []);

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
                {sortedObras.map((item) => (
                    <Tr key={item.id} _hover={{ bg: 'gray.100' }}>
                        <Td>{item.nombreObra}</Td>
                        <Td>{item.PromedioPuntuacion}</Td>
                        <Td>{porcentaje[item.id]?.toFixed(2)}</Td>
                    </Tr>
                ))}
                <Tr>
                    <Td>Total</Td>
                    <Td>{Obras.reduce((sum, item) => sum + item.PromedioPuntuacion, 0)}</Td>
                    <Td>100</Td>
                </Tr>
            </Tbody>
        </Table>
    );
}

export default DataTable;