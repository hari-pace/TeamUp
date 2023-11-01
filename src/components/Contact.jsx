import React from "react";
import "./styling/contact.css";

const Contact = () => {
  return (
    <>
      <div className="events-heroDiv">
        <h1 className="events-h1"> Contact us</h1>
      </div>
      <div className="about-main-container">
        <div className="about-heading">
          <h2 className="contact-subheading">Having issues?</h2>
          <h2 className="contact-text">
            Don't hesitate to get in contact with us here:{" "}
            <a
              className="contact-text"
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
