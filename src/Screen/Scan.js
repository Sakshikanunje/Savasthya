import React, { useState, useContext } from 'react';
import { QrReader } from 'react-qr-reader';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom'; 

export default function Scan() {
  const [scanResult, setScanResult] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);
      try {
        const response = await axios.get(`/scan/${data}`);
        if (response.data.redirect) {
          if (auth) {
            navigate(`/profile/${data}`);
          } else {
            setAuth({ scanUUID: data });
            navigate('/loginOpt');
          }
        }
      } catch (error) {
        console.error('Error scanning QR code:', error);
      }
    }
  };

  const handleImageUpload = async () => {
    const handleImageUpload = async () => {
      console.log('Upload Image button clicked');
      if (!selectedFile) {
        console.error('No file selected');
        return;
      }
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const imageData = reader.result;
      try {
        const response = await axios.post('/uploadImage', { imageData });
        if (response.data.qrCodeData) {
          handleScan(response.data.qrCodeData);
        } else {
          console.error('No QR code found in the image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ marginTop: '5%' }}>QR Code Scanner</h1>
      <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      <p>{scanResult}</p>
      <Footer />
    </div>
  );
}
