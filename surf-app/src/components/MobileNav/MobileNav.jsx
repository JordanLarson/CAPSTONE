import React from "react";
import { Link } from "react-router-dom";
import "./MobileNav.css";

const MobileNav = ({ open, handleNav }) => {
  return open ? (
    <div className="mob-nav">
      <h4 onClick={handleNav} className="close-nav">
        x
      </h4>
      <Link className="favorites-mob" to="/favorites" onClick={handleNav}>
        FAVORITES
      </Link>
      <Link className="login-mob" to="/login" onClick={handleNav}>
        LOGIN
      </Link>
      <Link className="home-mob" to="/" onClick={handleNav}>
        HOME
      </Link>
      <Link className="waves-mob" to="/waves" onClick={handleNav}>
        WAVES
      </Link>
      <Link className="about-mob" to="/about" onClick={handleNav}>
        ABOUT
      </Link>
    </div>
  ) : (
    <div className="hamburger-nav" onClick={handleNav}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default MobileNav;
