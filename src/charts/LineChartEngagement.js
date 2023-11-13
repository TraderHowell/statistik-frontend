import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, LineElement, Tooltip, Legend } from 'chart.js';
import { format } from 'date-fns';

Chart.register({
    CategoryScale,
    LinearScale,
    LineElement,
    Tooltip,
    Legend,
});

function formatDateString(dateString) {
    const date = new Date(dateString);
    return format(date, 'MM-dd-yyyy');
}

function LineChartEngagement({ apiData, startDate, endDate }) {

    const graphData = apiData.map((item) => ({
        date: formatDateString(item.date),
        newfollowersperminute: item.newfollowersperminute !== null ? parseFloat(item.newfollowersperminute) : null,
        likesperminute: item.likesperminute !== null ? parseFloat(item.likesperminute) : null,
        viewerswhocommentedperminute: item.viewerswhocommentedperminute !== null ? parseFloat(item.viewerswhocommentedperminute) : null,
        sharesperminute: item.sharesperminute !== null ? parseFloat(item.sharesperminute) : null,
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
            label: "New Followers/Min",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            data: filteredData.map((item) => item.newfollowersperminute),
        },
        {
            label: "Likes/Min",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: filteredData.map((item) => item.likesperminute),
        },
        {
            label: "Viewers Who Commented/Min",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
            data: filteredData.map((item) => item.viewerswhocommentedperminute),
        },
        {
            label: "Shares/Min",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            data: filteredData.map((item) => item.sharesperminute),
        },
        ],
    };

    const options = {
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default LineChartEngagement;