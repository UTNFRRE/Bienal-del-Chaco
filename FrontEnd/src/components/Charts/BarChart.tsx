import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
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

interface BarChartProps {
    dato: Obra[];
}


const BarChart: React.FC <BarChartProps> = ({dato}) => {
    const [porcentaje, setPorcentaje] = useState<{ [key: number]: number }>({});



    useEffect(() => {
        const totalVotes = dato.reduce((sum, item) => sum + item.promedioVotos, 0);
        const porcentajes = dato.reduce((acc, item) => {
            acc[item.esculturaId] = (item.promedioVotos / totalVotes) * 100;
            return acc;
        }, {} as { [key: number]: number });
        setPorcentaje(porcentajes);
    }, [dato]);

    // Definir las opciones del gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 0,        // Establece el mínimo en 0
                max: 100,      // Establece el máximo en 100
                ticks: {
                    stepSize: 10, // Controla el intervalo de las marcas (puedes ajustarlo)
                    callback: function (tickValue: string | number) {
                        return `${tickValue}%`; // Añade el símbolo de porcentaje
                    },
                },
            },
        },
    };

    // Datos para el gráfico
    const data = {
        labels: dato.map((item) => item.nombre),
        datasets: [
            {
                label: 'Bienal edicion 2019',
                data: dato.map((item) => porcentaje[item.esculturaId]),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ position: 'relative', height: '55vh' }}>
            <Bar options={options} data={data} />
        </div>
    );
};

export default BarChart;
