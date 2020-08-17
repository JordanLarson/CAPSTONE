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
        Favorites
      </Link>
      <Link className="login-mob" to="/login" onClick={handleNav}>
        Login
      </Link>
      <Link className="home-mob" to="/home" onClick={handleNav}>
        Home
      </Link>
      <Link className="waves-mob" to="/waves" onClick={handleNav}>
        Waves
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
