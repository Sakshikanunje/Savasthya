import React from "react";
import InformationCard from "./InformationCard";
import { faHeartPulse, faTruckMedical, faTooth } from "@fortawesome/free-solid-svg-icons";
import "./Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>About Us</span>
        </h3>
        <p className="info-description">
        Our system tracks a user's medical history via a unique QR code on the Sanjivan card.The HealthComrade AI model 
        assists in diagnosing diseases and recommending precautions, medications, diets, 
        and workouts based on symptoms.This integration ensures personalized and comprehensive healthcare management.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Sanjivan Card"
          description="The Sanjivan Card features a unique QR code assigned to each user, facilitating 
          personalized identification and access. Embedded within the QR code are essential user details
          and medical history, ensuring efficient retrieval and utilization of healthcare information."
          icon={faTruckMedical}
        />

        <InformationCard
          title="HealthComrade AI"
          description="The model employs algorithm to predict diseases and provides comprehensive
           guidance including disease descriptions, precautionary measures, 
           medication recommendations,  diet plans, and  workout  based on symptoms reported by users."
          icon={faHeartPulse}
        />

        <InformationCard
          title="Medical History"
          description="The Medical History feature maintains comprehensive records of a user's medical background,
           encompassing chief complaints, prescribed medications, recommending physicians, and the dates of these entries. 
           This data is systematically stored in the history table for reference. "
          icon={faTooth}
        />
      </div>
    </div>
  );
}

export default Info;