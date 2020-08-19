import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <p className="footer-p-tag">
        © 2020 TrueSurf |{" "}
        <Link className="footer-login-link" to="/login">
          Login{" "}
        </Link>{" "}
        |{" "}
        <Link className="footer-waves-link" to="/waves">
          Find Surf Nearby
        </Link>
        |
        <Link className="footer-fav-link" to="/faves">
          View Your Favorite Waves
        </Link>
      </p>
    </footer>
  );
};
export default Footer;
