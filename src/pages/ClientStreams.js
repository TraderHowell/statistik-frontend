import React, { useState, useEffect } from 'react';
import Table from '../tables/Table';
import Cookies from 'js-cookie';
import ClientMenu from '../templates/ClientMenu';
import ModalStreamAdd from '../modals/ModalStreamAdd';
import ModalStreamUpload from '../modals/ModalStreamUpload';
import ExportButton from '../templates/ExportButton';

function ClientStreams() {
const id = Cookies.get('id');
const name = Cookies.get('name');

const [clientData, setClientData] = useState([]);

const columns = [
    {label: "Date", accessor: "date", sortable: true, },
    { label: "Total Views", accessor: "totalviews", sortable: true },
    { label: "Unique Viewers", accessor: "uniqueviewers", sortable: true },
    { label: "Avg Watch Time", accessor: "avgwatchtime", sortable: true },
    { label: "Top Viewer Count", accessor: "topviewercount", sortable: true },
    { label: "New Followers", accessor: "newfollowers", sortable: true },
    { label: "Viewers Comments", accessor: "viewerswhocommented", sortable: true },
    { label: "Likes", accessor: "likes", sortable: true },
    { label: "Shares", accessor: "shares", sortable: true },
    { label: "Diamonds", accessor: "diamonds", sortable: true },
    { label: "Gifters", accessor: "gifters", sortable: true },
    { label: "Live Duration", accessor: "liveduration", sortable: true },
];
useEffect(() => {

    fetch(`http://localhost:3005/streams?id=${id}`)
    .then((response) => response.json())
    .then((data) => setClientData(data))
    .catch((error) => console.error("Error fetching data: ", error));
}, []);

return (
    <section id="content" className="container">
        <h1>Client: {name}</h1>
        <ClientMenu />
        <div className="card">
            <h2>Streams</h2>
            <p>Welcome to the stream list for {name}.</p>
            <div id="streamnav" className="menu">
                <ModalStreamAdd />
                <ModalStreamUpload />
                <ExportButton jsonData={clientData} clientName={name} />
            </div>
            <Table data={clientData} columns={columns} />
        </div>
    </section>
);
}

export default ClientStreams;