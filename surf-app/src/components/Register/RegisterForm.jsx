import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import apiUrl from "../apiConfig";
import "./RegisterForm.css";

const RegisterForm = (props) => {
  const history = useHistory();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const handleRegisterChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `${apiUrl}/users`,
      method: "POST",
      data: input,
    })
      .then((res) => {
        console.log("handlesubmit response is -", res);
        document.cookie = "username=" + res.data.username;
        setUser({ newUserProfile: res.data });
        history.push("/waves");
      })
      .catch(console.error);
  };
  return (
    <>
      <div>
        <img src="https://iili.io/dO8Dhu.png" alt="dO8Dhu.png" border="0" />
        <h3 className="create-header">Create An Account</h3>
      </div>
      <form onSubmit={handleSubmit} className="registration-form">
        <label className="username-label">Choose a Username</label>
        <input
          className="username-container"
          type="text"
          value={input.username}
          name="username"
          placeholder="username"
          onChange={handleRegisterChange}
        />
        <label className="password-label"> Create a Password</label>
        <input
          className="password-container"
          type="password"
          value={input.password}
          name="password"
          placeholder="password"
          onChange={handleRegisterChange}
        />
        <br />
        <br />
        <br />
        <button className="profile-create-button" type="submit">
          Create Account
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
