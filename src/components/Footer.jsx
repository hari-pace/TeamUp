import React, { useContext } from "react";
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
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Footer() {
  const { token } = useContext(AuthContext);
  return (
    <section>
      <Divider className="divider" />
      <div className="footer-container">
        <div className="footer-logo-container">
          <Logo />
        </div>
        <div className="footer-1">
          <ul>
            <li
              onClick={
                !token
                  ? () =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                  : null
              }
            >
              Login
            </li>
            <li
              onClick={
                !token
                  ? () =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                  : null
              }
            >
              Create an account
            </li>
            <li>
              <Link className="footer-links" to="/events">
                Find an event
              </Link>
            </li>
            <li>
              <Link
                className="footer-links"
                to={token ? "/events/create" : null}
              >
                Create an event
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-2">
          <ul>
            <li>
              <Link className="footer-links" to="/about">
                About Us
              </Link>
            </li>

            <li>
              <Link className="footer-links" to="/contact">
                Contact Us
              </Link>
            </li>
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
