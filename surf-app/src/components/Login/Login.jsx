import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from "axios";
import apiUrl from "../apiConfig";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();

    const makeAPICall = async () => {
      const response = await axios(
        `${apiUrl}/users/login?username=${username}&password=${password}`
      );
      document.cookie = "username=" + response.data.username + ";path=/";
      document.cookie = "userid" + response.data._id + ";path=/";
    };
    makeAPICall();
    history.push("/favorites");
  }

  return (
    <div className="Login">
      <Link to="/">
        <img src="https://iili.io/dO8Dhu.png" alt="dO8Dhu.png" border="0" />
      </Link>
      <h3 className="login-log-header">LOGIN TO YOUR ACCOUNT</h3>
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel className="login-label">Username</FormLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel className="login-label">Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="input-field"
          />
        </FormGroup>
        <Button
          block
          bsSize="large"
          disabled={!validateForm()}
          type="submit"
          className="login-button"
        >
          Login
        </Button>
      </form>
      <br />
      <br />
      <div className="divider"></div>
      <br />
      <p className="create-profile-ptag">Don't have a profile yet?</p>
      <Link to="/register">
        <button className="register-button">Create a profile</button>
      </Link>
    </div>
  );
}
