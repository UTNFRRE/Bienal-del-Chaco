// ManagerVotes.js
import { Box, Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';
import CreateVoteButton from "../../components/Vote/CreateVoteButton";
import QrButton from "../../components/Vote/QrButton";
// import EdicionesMenu from '../../components/Vote/EdicionesMenu';
import DataTable from '../../components/Vote/DataTable';
import PieChart from '../../components/Charts/PieChart';
import BarChart from '../../components/Charts/BarChart';




const ManagerVotes = () => {
    const [chart, setChart] = useState<string | null>("first");

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
                        <QrButton />
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
                            <DataTable  />
                        </Box>
                        <Box height="100%" width="60%">
                            <Tabs index={chart === "first" ? 0 : 1} onChange={(index) => setChart(index === 0 ? "first" : "second")}>
                                <TabList>
                                    <Tab>Circular</Tab>
                                    <Tab>Barras</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel height="100%">
                                        <PieChart  />
                                    </TabPanel>
                                    <TabPanel>
                                        <BarChart/>
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
