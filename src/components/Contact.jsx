import React from "react";
import "./styling/contact.css";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const Contact = () => {
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
        <h1 className="about-us-heading"> Contact us</h1>
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
          <h2 className="contact-subheading">Having issues?</h2>
          <h2>
            <span className="contact-text">
              Don't hesitate to get in contact with us here:
            </span>{" "}
            <a
              className="contact-link"
              href={`mailto:${"teamup.germany@gmail.com"}`}
            >
              teamup.germany@gmail.com
            </a>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Contact;
