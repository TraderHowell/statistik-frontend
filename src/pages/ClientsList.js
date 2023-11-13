import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import ModalClientAdd from '../modals/ModalClientAdd';
import Table from '../tables/Table';

const columns = [
  { label: "Client Name", accessor: "clientname", sortable: true },
  { label: "Total Views", accessor: "totalviews", sortable: true },
  { label: "Earliest Date", accessor: "earliestdate", sortable: true },
];

function ClientsList() {
  Cookies.remove('id');
  const [clientData, setClientData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/getclients`)
      .then((response) => response.json())
      .then((data) => setClientData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <section id="content" className="container">
      <h1>StatisTik Home</h1>
      <p>Welcome to StatisTik, an analytics platform for TikTok.</p>
      <div className="card">
        <h2>Clients</h2>
        <p>Select a client to open the client dashboard, streams, and settings.</p>
        <div id="cardnav" className="menu">
          <ModalClientAdd />
        </div>
        <Table data={clientData} columns={columns} />
      </div>
    </section>
  );
}

export default ClientsList;
