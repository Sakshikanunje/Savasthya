import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import bg from "../Database/bg.png";
import doc from "../Database/doc.png";
import "./Doctorpro.css";
import bimg from "../Database/bimg.png"
import ImageResizer from 'react-image-file-resizer';
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';


function Doctorpro() {
    return (
        <>
        <Navbar/>
           <div className="landscape-page">
        <img src={doc} alt="Left" className="left-image" />
        <img src={bg} alt="Background" className="background-image" />
        <button className="image-button">
          <img src={bimg} alt="Button" className="button-image" />
        </button>
      </div>
      <div className="landscape-page">
        <img src={doc} alt="Left" className="left-image1" />
        <img src={bg} alt="Background" className="background-image" />
        <button className="image-button1">
          <img src={bimg} alt="Button" className="button-image1" />
        </button>
      </div>
      <Footer/>
        </>
      
    )
}

export default Doctorpro
