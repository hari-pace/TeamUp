import React from "react";
import "./styling/about.css";
import { LinkedinOutlined, GithubOutlined } from "@ant-design/icons";

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
            <div className="about-person-pic">
              <div>
                <img
                  className="about-img"
                  src="https://media.licdn.com/dms/image/D4E16AQGbX5xeyuyeRQ/profile-displaybackgroundimage-shrink_350_1400/0/1678264630025?e=1704326400&v=beta&t=eBipnOgkfoqPYrwyQ6DT06UA1zF4hi0zS2emy1TPtEk"
                  alt=""
                />
              </div>
              <div className="about-socials">
                <LinkedinOutlined />
                <GithubOutlined />
              </div>
            </div>
            <div className="about-person-text">TEXT GOES HERE</div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container">
            <div className="about-person-pic"></div>
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
