import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  const [open, isOpen] = useState(false);
  const handleClick = () => {
    isOpen(!open);
    console.log(open);
  };

  return (
    <div className="nav">
      <div className="desk-nav">
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
    </div>
  );
};

export default Nav;
