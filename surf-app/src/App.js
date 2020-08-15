import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import logo from "./logo.svg";
import Home from "./components/Home/Home";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";
import Waves from "./components/Waves/Waves";
import RegisterForm from "./components/Register/RegisterForm";

// APIkey =
//   "http://magicseaweed.com/api/66c79af0fe4e3fb73b3915ea2ef63999/forecast/?spot_id=10";
// ("96a6186e-df2f-11ea-9e97-0242ac130002-96a61954-df2f-11ea-9e97-0242ac130002");

function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/waves" component={Waves} />
      </Switch>
    </>
  );
}

export default App;
