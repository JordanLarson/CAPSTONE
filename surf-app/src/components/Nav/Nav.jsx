import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [open, isOpen] = useState(false);
  const handleClick = () => {
    isOpen(!open);
    console.log(open);
  };

  return (
    <div className="nav">
      <div className="desk-nav">
        <Link to="/favorites">Favorites</Link>
        <Link to="/login">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/waves">Waves</Link>
      </div>
    </div>
  );
};

export default Nav;
