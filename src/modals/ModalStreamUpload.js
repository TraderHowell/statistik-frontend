import React, { useState, useEffect } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ModalStreamUpload() {
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
  
    function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
    }
  
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loaded, setLoaded] = useState(0);
  
    const handleSelectedFiles = (event) => {
      const files = event.target.files;
      setSelectedFiles(files);
      setLoaded(0);
    };
  
    const handleUpload = () => {
      const data = new FormData();
  
      for (let i = 0; i < selectedFiles.length; i++) {
        data.append('files', selectedFiles[i]);
      }
  
      axios
        .post(`http://localhost:3005/upload?id=${id}`, data, {
          onUploadProgress: (progressEvent) => {
            setLoaded((progressEvent.loaded / progressEvent.total) * 100);
          },
        })
        .then((res) => {
          // console.log(res.statusText);
        });
      window.location.reload();
    };

return (
    <>
    <button onClick={toggleModal} className="btn-modal">Upload Stream</button>

    {modal && (
        <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content card">
                <h2>Upload Stream Data</h2>
                <p>Upload .zip files associated with a stream exported from TikTok.</p>
                <input className="dropzone" type="file" name="" id="" onChange={handleSelectedFiles} multiple />
                <form onSubmit={handleUpload}>
                    <button type="submit">Upload</button>
                </form>
                <button className="close-modal" onClick={toggleModal}>Close</button>
            </div>
        </div>
    )}
    </>
    );
}

export default ModalStreamUpload;