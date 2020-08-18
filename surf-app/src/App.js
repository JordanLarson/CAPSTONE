import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css";
import Nav from "./components/Nav/Nav";
import Login from "./components/Login/Login";
import Waves from "./components/Waves/Waves";
import RegisterForm from "./components/Register/RegisterForm";
import Messages from "./components/Messages/Messages";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";

function App() {
  return (
    <div className="App">
      <>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/waves" component={Waves} />
          <Route path="/messages" component={Messages} />
          <Route path="/about" component={About} />
        </Switch>
        <Footer />
      </>
    </div>
  );
}

export default App;
