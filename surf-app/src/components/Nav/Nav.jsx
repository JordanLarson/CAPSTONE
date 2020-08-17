import React, { useState } from "react";
import { Link } from "react-router-dom";
import Media from "react-media";
import MobileNav from "../MobileNav/MobileNav";
import "./Nav.css";

const Nav = () => {
  const [open, isOpen] = useState(false);
  const handleNav = () => {
    isOpen(!open);
  };

  return (
    <div className="navigation">
      <Media query="(min-width: 768px)">
        {(matches) => {
          return matches ? (
            <div className="main-nav">
              <Link className="favorites-link" to="/favorites">
                Favorites
              </Link>
              <Link className="login-link" to="/login">
                Login
              </Link>
              <Link className="home-link" to="/home">
                Home
              </Link>
              <Link className="waves-link" to="/waves">
                Waves
              </Link>
            </div>
          ) : (
            <MobileNav handleNav={handleNav} open={open} />
          );
        }}
      </Media>
    </div>
  );
};

export default Nav;
