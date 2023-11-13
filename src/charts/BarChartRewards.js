import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import { format } from 'date-fns';

Chart.register({
CategoryScale,
LinearScale,
BarElement,
Tooltip,
Legend,
});

function formatDateString(dateString) {
const date = new Date(dateString);
return format(date, 'MM-dd-yyyy');
}

function BarChartRewards({ apiData, startDate, endDate }) {

const graphData = apiData.map((item) => ({
    date: formatDateString(item.date),
    diamondspermin: item.diamondspermin !== null ? parseFloat(item.diamondspermin) : null,
    gifterspermin: item.gifterspermin !== null ? parseFloat(item.gifterspermin) : null,
    diamondspergifters: item.diamondspergifters !== null ? parseFloat(item.diamondspergifters) : null,
}));

// console.log(JSON.stringify(startDate));

const filteredData = graphData.filter((item) => {
    if (!startDate || !endDate) return true;
    const date = new Date(item.date);
    return date >= startDate && date <= endDate;
});

const chartData = {
    labels: filteredData.map((item) => item.date),
    datasets: [
    {
        label: "Diamonds/Min",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: filteredData.map((item) => item.diamondspermin),
    },
    {
        label: "Gifters/Min",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: filteredData.map((item) => item.gifterspermin),
    },
    {
        label: "Diamonds/Gifters",
        backgroundColor: "rgba(255, 159, 64, 0.2)", // Changed color
        borderColor: "rgba(255, 159, 64, 1)", // Changed color
        borderWidth: 1,
        data: filteredData.map((item) => item.diamondspergifters),
    },
    ],
};

const options = {
    maintainAspectRatio: false,
};

return (
    <div>
        <Bar data={chartData} options={options} />
    </div>
);
}

export default BarChartRewards;