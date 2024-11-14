// ManagerVotes.js
import { Box, Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { useState, useEffect} from 'react';
import CreateVoteButton from "../../components/Vote/CreateVoteButton";
import QrButton from "../../components/Vote/QrButton";
// import EdicionesMenu from '../../components/Vote/EdicionesMenu';
import DataTable from '../../components/Vote/DataTable';
import PieChart from '../../components/Charts/PieChart';
import BarChart from '../../components/Charts/BarChart';

import { useEdicion } from '../../EdicionContexto';
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

const ManagerVotes = () => {
    const [chart, setChart] = useState<string | null>("first");
    const [Obras, setObras] = useState<Obra[]>([]);

    //variable para llamar a la API
    const [refresh, setRefresh] = useState(false);
    const [currentPage] = useState(1);
    const [pageNumber] = useState(10);
    const {edicion} = useEdicion();

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
        
    }, [edicion]);


    //Llamario a la API

    // Define el tipo de obrasDeEdicion como un array de Obra
    
    return (
        <>
            <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                overflowX="hidden"
            >
                <Flex
                    width="100vw"
                    height='10vh'
                    justifyContent='space-between'>
                    {/* Yoel dijo que sacara esto :( ) */}
                    {/* <Box position='absolute' zIndex={1} display="flex" width="10vw" top='13%' justifyContent="center" alignItems="center" ml={{ base: 2, md: 4 }}>
                        <EdicionesMenu />
                    </Box> */}
                    <Flex
                        zIndex={0}
                        width="100vw"
                        height="100%"
                        justify="center"
                        align="center"
                        gap={4}
                    >
                        <CreateVoteButton />
                        <QrButton data={Obras} />
                    </Flex>
                </Flex>
                <Flex
                    justifyContent='center'
                    width='100vw'
                    flexDirection={'row'}
                    height={'75vh'}
                >
                    <Box
                        bg="secundaryBg"
                        p={6}
                        w="95vw"
                        borderWidth={1}
                        borderColor={"secundaryHover"}
                        display="flex"
                        height={{base: "auto", md: "75vh"}}
                        alignItems="center"
                        justifyContent="center"
                        flexDirection={{base: "column", md: "row"}}
                        position="absolute"
                    >
                        <Box height="100%" width={{md:"40%", base:"100%"}}>
                             <DataTable data={Obras} /> 
                        </Box>
                        <Box  height="100%" width="60%">
                            <Tabs index={chart === "first" ? 0 : 1} onChange={(index) => setChart(index === 0 ? "first" : "second")}>
                                <TabList>
                                    <Tab>Circular</Tab>
                                    <Tab>Barras</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel height="100%">
                                        <PieChart dato={Obras} />
                                    </TabPanel>
                                    <TabPanel>
                                        <BarChart dato={Obras}/>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}

export default ManagerVotes;
