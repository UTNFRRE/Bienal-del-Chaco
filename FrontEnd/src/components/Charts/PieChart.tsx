import obras from '../../API/ObrasVote';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS, Tooltip, ArcElement} from 'chart.js';

ChartJS.register(Tooltip, ArcElement);

const PieChart =  () => {
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
                hoverOffset: 4,
            },
        ],
    };
    return(
        <Pie options={options} data={data} />
    )
}

export default PieChart;