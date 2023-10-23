import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Logo from "./Logo";
import { Divider } from "antd";
import "./styling/footer.css";

function Footer() {
  return (
    <section>
      <Divider className="divider" />
      <div className="footer-container">
        <div className="footer-logo-container">
          <Logo />
        </div>
        <div className="footer-1">
          <ul>
            <li>Login</li>
            <li>Create an account</li>
            <li>Find an event</li>
            <li>Create an event</li>
          </ul>
        </div>
        <div className="footer-2">
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Careers at TeamUp</li>
            <li>FAQ's</li>
          </ul>
        </div>
        <div className="footer-3">
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Terms of use</li>
          </ul>
        </div>
      </div>
      <div className="footer-socials-container">
        <a href="https://www.facebook.com">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.twitter.com">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://www.instagram.com">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://www.linkedin.com">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
    </section>
  );
}

export default Footer;
