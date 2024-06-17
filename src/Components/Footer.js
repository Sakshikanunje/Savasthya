import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';
import './Footer.css'

export default function Footer() {
  return (
    <div>
      <footer className="bg-light text-dark text-center py-4 ">
      
        <Row>
          <Col>
            <div className="mb-3">
              <a href="#" className="social-icon social-icona">
                <FaFacebookF />
              </a>
              <a href="#" className="social-icon social-icona">
                <FaTwitter />
              </a>
              <a href="#" className="social-icon social-icona ">
                <FaGoogle />
              </a>
              <a href="#" className="social-icon social-icona">
                <FaLinkedinIn />
              </a>
              <a href="#" className="social-icon social-icona">
                <FaInstagram />
              </a>
              <a href="#" className="social-icon social-icona">
                <FaGithub />
              </a>
            </div>
            <p className="mb-0">&copy; 2024 Copyright Swastya.com</p>
          </Col>
        </Row>
     
    </footer>
  </div>
  )
}