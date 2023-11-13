import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ClientMenu from '../templates/ClientMenu'

function ClientSettings() {
    const id = Cookies.get('id');
    const name = Cookies.get('name');
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!id || !name) {
        // navigate('/');
      }
    }, []);
  
    async function renameclient(e) {
      e.preventDefault();
      const clientName = e.target.elements.clientName.value;
      if (clientName !=null && clientName != '') {
        try {
          const response = await fetch(`http://localhost:3005/renameclient?id=${id}&name=${encodeURIComponent(clientName)}`);
          Cookies.set('name', clientName);
          window.location.reload(false);
          if (!response.ok) {
            throw new Error(`Network response was not ok ${response.statusText}`);
          }
          const data = await response.json();
        } catch (error) {
          console.error('There has been a problem with your fetch operation:', error);
        }
      }
    }
  
    async function delclient(e) {
      e.preventDefault();
      const DELETE = document.getElementById('DELETE').value;
      console.log(DELETE);
      if (DELETE === name) {
        if (window.confirm("You are about to permanently delete client \"" + name + "\".\nAre you sure? This action cannot be undone.")) {
          try {
            const response = await fetch(`http://localhost:3005/delclient?id=${id}`);
            navigate('/');
            if (!response.ok) {
              throw new Error(`Network response was not ok ${response.statusText}`);
            }
            const data = await response.json();
          } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
          }
        }
      }
  
  
    }

return (
    <section id="content" className="container">
        <h1>Client: {name}</h1>
        <ClientMenu />
        <div className="card">
            <h2>Settings</h2>
            <p>Make configuration changes for {name} using the options below.</p>
            <form onSubmit={renameclient}>
                <h3>Rename</h3>
                <p>Type the new name below to rename the client.<br />
                The new name must not be an empty string.</p>
                <label>New Name:
                    <input name="clientName"/>
                </label>
            <button type="submit">Rename</button>
            </form>
            <form onSubmit={delclient}>
                <h3>Delete Client</h3>
                <p><b> Once you delete a client, the action cannot be undone</b>.<br />
                Delete client "{name}" by the typing the name exactly as shown.</p>
                <label>
                    Confirm Client Name:
                    <input name="DELETE" id="DELETE"/>
                </label>
                <button type="submit" >Delete Permanently</button>
            </form>
        </div>
    </section>
);
}

export default ClientSettings;