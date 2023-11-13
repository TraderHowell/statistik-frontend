import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function ModalClientAdd() {
const [modal, setModal] = useState(false);
const navigate = useNavigate();

const toggleModal = () => {
    setModal(!modal);
};

if(modal) {
    document.body.classList.add('active-modal')
} else {
    document.body.classList.remove('active-modal')
}

async function handleSubmit(e) {
    e.preventDefault();  // Prevent the default form submission behavior
    const clientName = e.target.elements.clientName.value;
    fetch(`http://localhost:3005/addclient?name=${encodeURIComponent(clientName)}`)
        .then(
            toggleModal(),
            window.location.reload(false)
        )
        .catch((error) => console.error("Error sending data: ", error));
  }

return (
    <>
    <button onClick={toggleModal} className="btn-modal">Add Client</button>

    {modal && (
        <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content card">
                <h2>Add New Client</h2>
                <p>Add a new client to the list by entering the client name below.</p>
                <form onSubmit={handleSubmit}>
                <label>
                    Client Name:
                    <input name="clientName"/>
                </label>
                <button type="submit">Add</button>
                </form>
                <button className="close-modal" onClick={toggleModal}>Close</button>
            </div>
        </div>
    )}
    </>
);
}

export default ModalClientAdd;