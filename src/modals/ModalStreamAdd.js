import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ModalStreamAdd() {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const id = Cookies.get('id');
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!id) {
        navigate('/');
      }
    }, []);
  
    async function createEmpty(e) {
      try {
  
  
        e.preventDefault();  // Prevent the default form submission behavior
        const emptyDate = e.target.elements.emptyDate.value;
        fetch(`http://localhost:3005/createemptystream?date=${emptyDate}&id=${id}`)
        .then(
          toggleModal(),
          window.location.reload(false)
        )
          .catch((error) => console.error("Error sending data: ", error));
  
  
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }

return (
    <>
    <button onClick={toggleModal} className="btn-modal">Add Stream</button>

    {modal && (
        <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content card">
                <h2>Add New Stream</h2>
                <form onSubmit={createEmpty}>
                    <p>Add a new empty stream on a specified day.</p>
                    <input name='emptyDate' placeholder='YYYY-MM-DD'></input>
                    <button type="submit">Add</button>
                </form>
                <button className="close-modal" onClick={toggleModal}>Close</button>
            </div>
        </div>
    )}
    </>
    );
}

export default ModalStreamAdd;