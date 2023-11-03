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
              <div>TEXT GOES HERE</div>
            </div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container">
            <div className="about-person-pic">
              <div>
                <img
                  className="about-img"
                  src="https://www.aquasabi.de/media/image/product/19046/md/back-to-nature-river-stone.jpg"
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
              <h3 className="about-person-title">Stoneman</h3>
              <div>TEXT GOES HERE</div>
            </div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container">
            <div className="about-person-pic">
              <div>
                <img
                  className="about-img"
                  src="https://thumbs.dreamstime.com/z/man-watermelon-head-man-watermelon-head-minimal-concept-107767608.jpg"
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
              <h3 className="about-person-title">Lazyman</h3>
              <div>TEXT GOES HERE</div>
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
              <div>TEXT GOES HERE</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
