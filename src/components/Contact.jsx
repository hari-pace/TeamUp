import React from "react";
import "./styling/contact.css";

const Contact = () => {
  return (
    <>
      <div className="about-us-hero-gradient-1"></div>
      <div className="about-us-hero">
        <h1 className="about-us-heading"> Contact us</h1>
      </div>
      <div className="about-us-hero-gradient-2"></div>
      <div className="about-main-container">
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
