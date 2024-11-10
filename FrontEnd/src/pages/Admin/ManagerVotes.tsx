// ManagerVotes.js
import { Box, Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';
import CreateVoteButton from "../../components/Vote/CreateVoteButton"; // Botón para crear votación
import QrButton from "../../components/Vote/QrButton"; // Botón para generar QR
import EdicionesMenu from '../../components/Vote/EdicionesMenu';
import DataTable from '../../components/Vote/DataTable';
import PieChart from '../../components/Charts/PieChart';
import BarChart from '../../components/Charts/BarChart';
import obras from '../../API/ObrasVote';

const ManagerVotes = () => {
    const [chart, setChart] = useState<string | null>("first");
    const [filteredObras, setFilteredObras] = useState(obras); // Estado para las obras filtradas

    // Maneja el cambio de edición
    interface Obra {
        id: number;
        title: string;
        // Add other properties as needed
    }

    const handleEditionChange = (obrasDeEdicion: Obra[]) => {
        setFilteredObras(obrasDeEdicion); // Actualiza el estado con las obras filtradas
    };

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
                    <Box position='absolute' zIndex={1} display="flex" width="10vw" top='13%' justifyContent="center" alignItems="center" ml={{ base: 2, md: 4 }}>
                        <EdicionesMenu onChangeEdition={handleEditionChange} />
                    </Box>
                    <Flex
                        zIndex={0}
                        width="100vw"
                        height="100%"
                        justify="center"
                        align="center"
                        gap={4}
                    >
                        <CreateVoteButton /> {/* Botón para crear votación */}
                        <QrButton /> {/* Botón para generar QR */}
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
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box height="100%" width="40%">
                            <DataTable obras={filteredObras} /> {/* Pasa las obras filtradas a DataTable */}
                        </Box>
                        <Box height="100%" width="60%">
                            <Tabs index={chart === "first" ? 0 : 1} onChange={(index) => setChart(index === 0 ? "first" : "second")}>
                                <TabList>
                                    <Tab>Circular</Tab>
                                    <Tab>Barras</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel height="100%">
                                        <PieChart obras={filteredObras} /> {/* Gráfico de torta con obras filtradas */}
                                    </TabPanel>
                                    <TabPanel>
                                        <BarChart obras={filteredObras} /> {/* Gráfico de barras con obras filtradas */}
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
