import React from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <h1 className="home-header">
        <img src="https://iili.io/dO8Dhu.png" alt="dO8Dhu.png" border="0" />
        FIND THE BEST <br></br>SURF IN<br></br>YOUR REGION
      </h1>
      <Login />
    </div>
  );
};
export default Home;
