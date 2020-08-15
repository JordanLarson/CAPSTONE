import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiUrl from "../apiConfig";

const RegisterForm = (props) => {
  const history = useHistory();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.username]: e.target.value,
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
        console.log("handlesubmit respons is -", res);
        document.cookie = "username=" + res.data.username;
        setUser({ newUserProfile: res.data });
      })
      .catch(console.error);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="registration-form">
        <label>Choose a Username</label>
        <input
          type="text"
          value={input.username}
          name="username"
          onChange={handleChange}
        />
        <label> Create a Password</label>
        <input type="text" value={input.password} onChange={handleChange} />
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
