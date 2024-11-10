import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import obras from '../../API/ObrasVote';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);




const BarChart = () => {
    
    const options = {};
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
                borderWidth: 1,
            },
        ],
    };
    return (
        <Bar options={options} data={data}></Bar>
    )
}

export default BarChart;