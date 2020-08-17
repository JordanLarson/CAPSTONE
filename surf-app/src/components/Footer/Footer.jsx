import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <footer>
      <p>
        © 2020 TrueSurf | <Link to="/login">Login </Link> |{" "}
        <Link to="/waves">Find Surf Nearby</Link>
      </p>
    </footer>
  );
};
export default Footer;
