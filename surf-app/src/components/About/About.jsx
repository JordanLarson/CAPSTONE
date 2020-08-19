import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <Link to="/">
        <img src="https://iili.io/dO8Dhu.png" alt="dO8Dhu.png" border="0" />
      </Link>
      <h1 className="about-header">ABOUT US</h1>
      <p className="about-paragraph">
        TrueSurf was designed to create an interface for surfers to connect and
        find a location that fits their specific criteria. Surfing has long been
        an exclusive sport, but the times have changed and its due time that the
        sport of Surfing reflects that. TrueSurf aims to open communcation up
        between groups and individuals that would normally never interact in the
        water. By creating an interface for users to communicate, and update one
        another about a locations current conditions, users can meet new friends
        and even spare themselves the time and gas of driving out of the way to
        check a location. It is our goal at TrueSurf to build a more open, and
        accepting community between surfers.
      </p>
    </div>
  );
};
export default About;
