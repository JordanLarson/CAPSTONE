import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";
import Waves from "./components/Waves/Waves";
import RegisterForm from "./components/Register/RegisterForm";

function App() {
  return (
    <div className="App">
      <>
        <Nav />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/waves" component={Waves} />
        </Switch>
      </>
    </div>
  );
}

export default App;
