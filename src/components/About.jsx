import React from "react";
import "./styling/about.css";
import Kate from "../assets/Kate.jpg";
import Hari1 from "../assets/Hari1.jpg";
import Ehsan from "../assets/Ehsan.jpg";
import Darrell from "../assets/darrell.jpg";
import { LinkedinOutlined, GithubOutlined } from "@ant-design/icons";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const About = () => {
  const { light, dark, isLightTheme, toggleTheme } = useContext(ThemeContext);

  const themeStyles = isLightTheme ? light : dark;

  return (
    <>
      <div
        className={
          isLightTheme
            ? "about-us-hero-gradient-1"
            : "about-us-hero-gradient-1-dark"
        }
      ></div>
      <div
        className="about-us-hero"
        style={{ background: themeStyles.grey, color: themeStyles.text }}
      >
        <h1 className="about-us-heading"> About us</h1>
      </div>
      <div
        className={
          isLightTheme
            ? "about-us-hero-gradient-2"
            : "about-us-hero-gradient-2-dark"
        }
      ></div>
      <div
        className="about-main-container"
        style={{ background: themeStyles.grey, color: themeStyles.text }}
      >
        <div className="about-heading">
          <h2 className="about-subheading">The team</h2>
        </div>
        <div className="about-container">
          <div className="about-person-container" id="about-hari">
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
                through sport, hence the creation of this app. I've loved being
                a part of the TeamUp team, and upon completion of our Full-Stack
                Web Development course, I look forward to kick-starting my new
                career in tech
              </div>
            </div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container" id="about-kate">
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
              <div className="about-person-text-paragraph">
                As a basketball lover I think that it must be very easy to bond
                with new people via sport. Since the time I became a foreigner
                in Germany I do not find it easy no more: lack of courts and
                language barrier makes it very difficult to find your crew. I
                truly believe that no matter where you are or who you are, you
                should be able to play your favorite sport. I am very pleased
                with opportunity to build this app with my new team of Hari,
                Ehsan and Darrell (yes, JavaScript is also a team sport!)
              </div>
            </div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container" id="about-ehsan">
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
              <div className="about-person-text-paragraph">
                I came to Germany as a student in 2016. As a newcomer, I was
                eager to immerse myself in the local culture, and what better
                way to do that than through sports? I was particularly
                interested in team sports, as they not only provide a great way
                to stay fit, but also offer an opportunity to socialize and make
                new friends. However, I found it challenging to find a local
                sports group that I could join. That’s when the idea of
                developing an application that could help people connect over
                their shared love for sports and facilitate joining sports
                groups
              </div>
            </div>
          </div>
        </div>
        <div className="about-container">
          <div className="about-person-container" id="about-darrell">
            <div className="about-person-pic">
              <div>
                <img className="about-img" src={Darrell} alt="darrell" />
              </div>
              <div className="about-socials">
                <p className="about-socials-text">Find me here: </p>
                <a
                  className="about-social-icons"
                  href="https://www.linkedin.com/in/droberts-developer/"
                >
                  <LinkedinOutlined />
                </a>
                <a
                  className="about-social-icons"
                  href="https://github.com/DarrellRoberts"
                >
                  <GithubOutlined />
                </a>
              </div>
            </div>
            <div className="about-person-text">
              <h3 className="about-person-title">Darrell</h3>
              <div className="about-person-text-paragraph">
                From the UK and moved to Germany in October 2020. Not
                particularly sporty nor competitive but love exercising
                outdoors. A son to a personal trainer, I know that the main
                barrier to exercise is in the mind, not in the body. Playing for
                fun and laughs is a big thing for me and I think this sentiment
                is lost, particularly in serious sport groups. Sport should be
                open to everyone and a way to unwind, decompress and have a
                laugh with other people. That way, it is a significant mood
                booster and something we can all benefit from
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
