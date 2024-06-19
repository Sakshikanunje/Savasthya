import React, { useEffect, useState } from "react";
import Doctor from "../Database/Doctor.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "./Hero.css";
import picture from "../Database/main.png";
import { Link } from "react-router-dom";
import doc from "../Database/doctor-picture.png";


function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">❤️ Health comes first</p>
          <br></br>
          <h2 className="text-title " style={{"color":"green"}}>
          आरोग्यं परमं भाग्यं स्वास्थ्यं सर्वार्थसाधनम्॥
          </h2>
          <p className="text-descritpion">
            Get medical advice, recommending precautions, medications, diets, 
            and workouts by using AIML.
          </p>
         <Link to="/model" ><button className="text-appointment-btn" type="button" >HealthComrade AI</button></Link>
          
          {/* <div className="text-stats">
            <div className="text-stats-container">
              <p>145k+</p>
              <p>Receive Patients</p>
            </div>

            <div className="text-stats-container">
              <p>50+</p>
              <p>Expert Doctors</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>Years of Experience</p>
            </div>
          </div> */}
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={doc} alt="Doctor" />
        </div>
      </div>
{/* <div>
  <img src={picture}/> </div> */}
      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;