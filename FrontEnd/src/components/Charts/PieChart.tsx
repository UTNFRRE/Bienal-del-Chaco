
import obras from '../../API/ObrasVote';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, ArcElement, Title} from 'chart.js';

// Registramos los elementos necesarios para Chart.js
ChartJS.register(Tooltip, ArcElement, Title);

const PieChart = () => {
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
        labels: obras.map((item) => item.nombreObra),
        datasets: [
            {
                label: 'Votos',
                data: obras.map((item) => item.CantVotos),
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
