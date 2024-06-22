import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import docc from '../Database/docc.png';
import bg from '../Database/bg.png';
import bimg from '../Database/bimg.png';
import './Doctorpro.css';

function Doctorpro() {
  return (
    <>
      <Navbar />
      <div className="landscape-page">
        <img src={docc} alt="Left" className="left-image" />
        <img src={bg} alt="Background" className="background-image" />
        <div className="doctor-details-container">
          
          <Link to="/doctorProfile/:uuid" className="doctor-details-button">
            <img src={bimg} alt="Doctor Details" className="button-image" />
          </Link>
        </div>
      </div>

      <Link to="/scan" className="image-button">
        <img src={bimg} alt="Scanner" className="button-image" />
      </Link>

      <Footer />
    </>
  );
}

export default Doctorpro;