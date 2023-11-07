import React from "react";
import "./styling/about.css";
import Kate from "../assets/Kate.jpg";
import Hari1 from "../assets/Hari1.jpg";
import Ehsan from "../assets/Ehsan.jpg";
import { LinkedinOutlined, GithubOutlined } from "@ant-design/icons";

const About = () => {
  return (
    <>
      <div className="about-us-hero-gradient-1"></div>
      <div className="about-us-hero">
        <h1 className="about-us-heading"> About us</h1>
      </div>
      <div className="about-us-hero-gradient-2"></div>
      <div className="about-main-container">
        <div className="about-heading">
          <h2 className="about-subheading">The team</h2>
        </div>
        <div className="about-container">
          <div className="about-person-container">
            <div className="about-person-pic">
              <div>
                <img className="about-img" src={Hari1} alt="" />
              </div>
              <div className="about-socials">
                <p className="about-socials-text">Find me here: </p>
                <a
                  className="about-social-icons"
                  href="https://www.linkedin.com/in/hari-pace/"
                >
                  <LinkedinOutlined />
                </a>
                <a
                  className="about-social-icons"
                  href="https://github.com/hari-pace"
                >
                  <GithubOutlined />
                </a>
              </div>
            </div>
            <div className="about-person-text">
              <h3 className="about-person-title">Hari</h3>
              <div className="about-person-text-paragraph">
                Moving from the UK to Munich at the end of 2018, I've enjoyed
                almost 5 years living in Germany and can't see myself leaving
                any time soon! A keen football player for over 20 years, I have
                experienced first-hand how easily new friendships can be formed
                through sport, hence the creation of this app. Upon completion
                of our Full-Stack Web Development course, I look forward to
                kick-starting my new career in tech.{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container">
            <div className="about-person-pic">
              <div>
                <img className="about-img" src={Kate} alt="" />
              </div>
              <div className="about-socials">
                <p className="about-socials-text">Find me here: </p>
                <a
                  className="about-social-icons"
                  href="https://www.linkedin.com/in/katerynatsyklauri/"
                >
                  <LinkedinOutlined />
                </a>
                <a
                  className="about-social-icons"
                  href="https://github.com/KateOblomova"
                >
                  <GithubOutlined />
                </a>
              </div>
            </div>
            <div className="about-person-text">
              <h3 className="about-person-title">Kate</h3>
              <div className="about-person-text-paragraph">TEXT GOES HERE</div>
            </div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container">
            <div className="about-person-pic">
              <div>
                <img className="about-img" src={Ehsan} alt="" />
              </div>
              <div className="about-socials">
                <p className="about-socials-text">Find me here: </p>
                <a
                  className="about-social-icons"
                  href="https://www.linkedin.com/in/ehsan-shahdoust/"
                >
                  <LinkedinOutlined />
                </a>
                <a
                  className="about-social-icons"
                  href="https://github.com/Shahdoust"
                >
                  <GithubOutlined />
                </a>
              </div>
            </div>
            <div className="about-person-text">
              <h3 className="about-person-title">Ehsan</h3>
              <div className="about-person-text-paragraph">TEXT GOES HERE</div>
            </div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container">
            <div className="about-person-pic">
              <div>
                <img
                  className="about-img"
                  src="https://i.redd.it/6zp2o12uk7x61.jpg"
                  alt=""
                />
              </div>
              <div className="about-socials">
                <p className="about-socials-text">Find me here: </p>
                <a
                  className="about-social-icons"
                  href="https://www.linkedin.com/in/hari-pace/"
                >
                  <LinkedinOutlined />
                </a>
                <a
                  className="about-social-icons"
                  href="https://github.com/hari-pace"
                >
                  <GithubOutlined />
                </a>
              </div>
            </div>
            <div className="about-person-text">
              <h3 className="about-person-title">Crazyman</h3>
              <div className="about-person-text-paragraph">TEXT GOES HERE</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
