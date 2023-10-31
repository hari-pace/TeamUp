import React from "react";
import "./styling/about.css";

const About = () => {
  return (
    <>
      <div className="events-heroDiv">
        <h1 className="events-h1"> About us</h1>
      </div>
      <div className="about-main-container">
        <div className="about-heading">
          <h2>The team</h2>
        </div>
        <div className="about-container">
          <div className="about-person-container">
            <div className="about-person-pic">PHOTO GOES HERE</div>
            <div className="about-person-text">TEXT GOES HERE</div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container">
            <div className="about-person-pic">PHOTO GOES HERE</div>
            <div className="about-person-text">TEXT GOES HERE</div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container">
            <div className="about-person-pic">PHOTO GOES HERE</div>
            <div className="about-person-text">TEXT GOES HERE</div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container">
            <div className="about-person-pic">PHOTO GOES HERE</div>
            <div className="about-person-text">TEXT GOES HERE</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
