import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useState, useEffect } from 'react';



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

interface DataTableProps{
    data: Obra[];
}

const DataTable : React.FC<DataTableProps> = ({data} ) => {
    // Define los datos que se van a mostrar en la tabla
    const [porcentaje,setPorcentaje] = useState <{[key:number]: number}> ({});
    const [sortedObras, setSortedObras] = useState(data);
    const [refresh, setRefresh] = useState(false);
    

    useEffect(() => {
        // Ordenar las obras de mayor a menor según su cantidad de votos
        const sorted = [...data].sort((a, b) => b.promedioVotos - a.promedioVotos);
        setSortedObras(sorted);
        setRefresh(!refresh);
    }, [data]);

    useEffect(() => {
        const totalVotes = sortedObras.reduce((sum, item)=> sum + item.promedioVotos, 0);
        const porcentajes = sortedObras.reduce((acc, item)=>{
            acc[item.esculturaId] = (item.promedioVotos / totalVotes) * 100;
            return acc;
        }, {} as {[key: number]: number});
        setPorcentaje(porcentajes)
    }, [refresh]);
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
                {data.length === 0 ? (
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
                            <Td>{data.reduce((sum, item) => sum + item.promedioVotos, 0)}</Td>
                            <Td>100</Td>
                        </Tr>
                    </>
                )}
            </Tbody>
        </Table>

    );
}

export default DataTable;