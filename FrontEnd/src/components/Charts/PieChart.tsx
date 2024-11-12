
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, ArcElement, Title} from 'chart.js';
import {getObras} from '../../API/Admin/Obras';
import { useEffect,useState } from 'react';
import {useEdicion} from '../../EdicionContexto'

// Registramos los elementos necesarios para Chart.js
ChartJS.register(Tooltip, ArcElement, Title);

interface Obras {
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

const PieChart = () => {

    const [obras, setObras] = useState<Obras[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [currentPage] = useState(1);
    const [pageNumber] = useState(10);
    const {edicion} = useEdicion();

    useEffect(()=>{
        const fecthObras = async () => {
            try{
                const datos = await getObras(currentPage, pageNumber, edicion);
                setObras(datos);
                setRefresh(!refresh);
            } catch(error){
                console.log("error al solicitar obras",error);
            }
        };
        fecthObras();
    },[edicion,refresh,]);

    const options = {
        responsive: true, // Hace que el gráfico sea responsive
        maintainAspectRatio: false, // Permite que el gráfico cambie su aspecto al redimensionar
        plugins: {
            tooltip: {
                callbacks: {
                    // Personaliza el tooltip si es necesario
                    label: (context: any) => `${context.label}: ${context.raw} votos`
                }
            }
        }
    };

    const data = {
        labels: obras.map((item) => item.nombre),
        datasets: [
            {
                label: 'Votos',
                data: obras.map((item) => item.promedioVotos),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(118, 200, 57, 0.2)',
                    'rgba(231, 60, 30, 0.2)',
                    'rgba(30, 173, 231, 0.2)',
                    'rgba(30, 152, 231, 0.2)',
                    'rgba(200, 30, 231, 0.2)',
                    'rgba(231, 221, 30, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(118, 200, 57, 1)',
                    'rgba(231, 60, 30, 1)',
                    'rgba(30, 173, 231, 1)',
                    'rgba(30, 152, 231, 1)',
                    'rgba(200, 30, 231, 1)',
                    'rgba(231, 221, 30, 1)',
                ],
                hoverOffset: 4, // Aumenta el tamaño del sector al hacer hover
            },
        ],
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '55vh' }}>
            {/* El gráfico tomará todo el tamaño disponible en el contenedor */}
            <Pie options={options} data={data} />
        </div>
    );
};

export default PieChart;
