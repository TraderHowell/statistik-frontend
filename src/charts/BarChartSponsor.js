import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register({
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    ChartDataLabels,
});

function formatDateString(dateString) {
    const date = new Date(dateString);
    return format(date, 'MM-dd-yyyy');
}

function BarChartSponsor({ apiData, startDate, endDate }) {
    const graphData = apiData.map((item) => ({
        date: formatDateString(item.date),
        uniqueviewersperhour: item.uniqueviewersperhour !== null ? parseFloat(item.uniqueviewersperhour) : null,
        viewerhoursperminute: item.viewerhoursperminute !== null ? parseFloat(item.viewerhoursperminute) : null,
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
                label: "Unique Viewers Per Hour",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                data: filteredData.map((item) => item.uniqueviewersperhour),
            },
            {
                label: "Viewer Hours Per Minute",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
                data: filteredData.map((item) => item.viewerhoursperminute),
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

export default BarChartSponsor;
