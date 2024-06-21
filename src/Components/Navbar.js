import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './Navbar.css';
import logo from "../Database/logo.png"

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    if (!isButtonDisabled) {
      toast.info("Experiencing high traffic, Please wait a moment.", {
        position: toast.POSITION.TOP_CENTER,
        onOpen: () => setIsButtonDisabled(true),
        onClose: () => setIsButtonDisabled(false),
      });
    }
  };

  return (
    <div className="navbar-section nava">
      <h1 className="navbar-title">
        <Link to="/">
      <img src={logo} style={{"height":"200px" , "width":"200px" , "marginTop":"5px"}}/>
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
            <Link to="/scan" onClick={openNav} href="#services">
             scan
            </Link>
          </li>
        <li>
          <Link to="/profile/:uuid" className="navbar-links">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/model" className="navbar-links">
            HealthComrade AI
          </Link>
        </li>
        <li>
          <Link to="/loginOpt" className="navbar-links">
            Login
          </Link>
        </li>
       
      </ul>
{/* Mobile */}
< div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>

        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/scan" onClick={openNav} href="#services">
             scan
            </Link>
          </li>
          <li>
            <Link to="/profile/:uuid" onClick={openNav} href="#services">
             Profile
            </Link>
          </li>
          <li>
            <Link to="/model"onClick={openNav} href="#about">
           HealthComrade AI
            </Link>
          </li>
          <li>
            <Link to="/loginOpt" onClick={openNav} href="#reviews">
            Login
            </Link>
          </li>
         
          
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;