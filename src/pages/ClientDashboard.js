import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ClientMenu from '../templates/ClientMenu'
import { Chart } from "chart.js";
import BarChartRewards from '../charts/BarChartRewards';
import BarChartSponsor from '../charts/BarChartSponsor';
import BarChartViews from '../charts/BarChartViews';
import LineChartEngagement from '../charts/LineChartEngagement';

function ClientDashboard() {
const [viewData, setViewData] = useState(null);
const [rewardData, setRewardData] = useState(null);
const [sponsorData, setSponsorData] = useState(null);
const [engagementData, setEngagementData] = useState(null);
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const navigate = useNavigate();
const id = Cookies.get('id');
const name = Cookies.get('name');

useEffect(() => {
    if (!id) {
    navigate('/');
    }
    // Fetch the API data here and set it to the apiData state
    fetch(`http://localhost:3005/views?id=${id}`)
    .then((response) => response.json())
    .then((data) => setViewData(data))
    .catch((error) => console.error("Error fetching data: ", error));

    fetch(`http://localhost:3005/rewards?id=${id}`)
    .then((response) => response.json())
    .then((data) => setRewardData(data))
    .catch((error) => console.error("Error fetching data: ", error));

    fetch(`http://localhost:3005/sponsorships?id=${id}`)
    .then((response) => response.json())
    .then((data) => setSponsorData(data))
    .catch((error) => console.error("Error fetching data: ", error));

    fetch(`http://localhost:3005/engagement?id=${id}`)
    .then((response) => response.json())
    .then((data) => setEngagementData(data))
    .catch((error) => console.error("Error fetching data: ", error));

}, []);

Chart.defaults.borderColor = '#272b3c';
Chart.defaults.color = '#f8f8f2';

return (
    <section id="content" className="container">
        <h1>Client: {name}</h1>
        <ClientMenu />
        <div className="card">
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard for {name}.<br />
            Here you can see an overview of your client's metrics.</p>
            <div id="cardnav" className="menu">
                <button onClick={window.print}>Print</button>
            </div>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
            />
            <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
            />
            <div className="chart-wrapper">
                <h3>Views Data</h3>
                {viewData && <BarChartViews apiData={viewData} startDate={startDate} endDate={endDate}/>}
            </div>
            <div className="chart-wrapper">
                <h3>Rewards Data</h3>
                {rewardData && <BarChartRewards apiData={rewardData} startDate={startDate} endDate={endDate}/>}
            </div>
            <div className="chart-wrapper">
                <h3>Sponsor Data</h3>
                {sponsorData && <BarChartSponsor apiData={sponsorData} startDate={startDate} endDate={endDate}/>}
            </div>
            <div className="chart-wrapper">
                <h3>Engagement Data</h3>
                {engagementData && <LineChartEngagement apiData={engagementData} startDate={startDate} endDate={endDate} />}
            </div>
        </div>
    </section>
);
}

export default ClientDashboard;