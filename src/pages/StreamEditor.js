import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ClientMenu from '../templates/ClientMenu'
import StreamMenu from "../templates/StreamMenu";

function StreamEditor() {
  const [streamData, setStreamData] = useState([]);
  const id = Cookies.get('id');
  const date = Cookies.get('date');
  const name = Cookies.get('name');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !date) {
      navigate('/');
    }

    fetch(`http://localhost:3005/streamspec?date=${date}`)
      .then((response) => response.json())
      .then((data) => setStreamData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  async function updateStreamValue(key, newValue) {
    try {
      console.log('Key:', key); // Log the key
      console.log('New Value:', newValue); // Log the new value
      //console.log('Date: ', date);
      const inputDate = new Date(date);
      const formattedDate = inputDate.toISOString().split('T')[0];
      console.log('Date: ', formattedDate);


      fetch(`http://localhost:3005/updatestreamvalue?date=${formattedDate}&key=${key}&value=${newValue}`)
        .then()
        .catch((error) => console.error("Error sending data: ", error));

      window.location.reload();
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  async function deleteStream() {
    try {
      const inputDate = new Date(date);
      const formattedDate = inputDate.toISOString().split('T')[0];
      console.log('Date: ', formattedDate);

      fetch(`http://localhost:3005/deleteStream?date=${formattedDate}`)
        .then()
        .catch((error) => console.error("Error sending data: ", error));

      navigate('/client-streams');

    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

return (
    <section id="content" className="container">
        <h1>Stream: {date}</h1>
        <h2>Client: {name}</h2>
        <StreamMenu />
        <div className="card">
            <h2>Stream Editor</h2>
            <p>Make configuration changes for the stream on {date}.</p>
            <h3>Update Data</h3>
            {streamData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Attribute</th>
                  <th>Value</th>
                  <th>New Value</th>
                  <th>Update Button</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(streamData[0]).map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{streamData[0][key]}</td>
                    <td><input id={key} type="number"></input></td>
                    <td>
                      <button
                        onClick={() => {
                          const newValue = document.getElementById(key).value;
                          updateStreamValue(key, newValue);
                        }}
                      >
                        UPDATE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
          <h3>Delete Stream</h3>
          <p>Once you delete a stream, the action cannot be undone. Please be certain.</p>
          <button onClick={() => { deleteStream()}}>Delete Permanently</button>
        </div>
    </section>
);
}

export default StreamEditor;