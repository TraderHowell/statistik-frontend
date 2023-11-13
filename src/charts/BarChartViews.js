import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
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

function BarChartViews({ apiData,  startDate, endDate}) {
    const graphData = apiData.map((item) => ({
        date: formatDateString(item.date),
        viewsperminute: item.viewsperminute,
        uniqueviewersperminute: item.uniqueviewersperminute,
    }));

    const filteredData = graphData.filter((item) => {
        if (!startDate || !endDate) return true;
        const date = new Date(item.date);
        return date >= startDate && date <= endDate;
    });

    const chartData = {
        labels: filteredData.map((item) => item.date),
        datasets: [
            {
            label: "Views/Min",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            data: filteredData.map((item) => parseFloat(item.viewsperminute)),
            },
            {
            label: "Unique Views/Min",
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: filteredData.map((item) => parseFloat(item.uniqueviewersperminute)),
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>)
    }

export default BarChartViews;