import React from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import "./Home.css";
const Home = () => {
  return (
    <div>
      <h1 className="home-header">
        FIND THE BEST <br></br>SURF IN<br></br>YOUR REGION
      </h1>
      <p>Login</p>
      <Login />
    </div>
  );
};
export default Home;
