import React from "react";
import ai  from "../Database/background.png";
import SolutionStep from "./SolutionStep";
import "./About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        {/* <img src={Doctor} alt="Doctor Group" className="about-image1" /> */}
        <img src={ai} alt="AI image" className="about-image1 "/>
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>HealthComrade AI</span>
        </h3>
        <p className="about-description">
        The model employs algorithms to predict diseases  and provide comprehensive guidance.This ensures personalized healthcare management. The model's capabilities enhance the accuracy and effectiveness of health recommendations.
        </p>

        <h4 className="about-text-title">Features</h4>

        <SolutionStep
          title="Predict and description"
          description="The model predicts diseases and provides detailed descriptions of each condition."
        />

        <SolutionStep
          title="Precaution and medication"
          description="The model provides precautionary measures and medication recommendations."
        />

        <SolutionStep
          title="Diet and Workout"
          description="The model provides diet plans and workout routines"
        />
      </div>
    </div>
  );
}

export default About;