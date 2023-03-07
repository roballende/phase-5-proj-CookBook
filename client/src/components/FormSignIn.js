import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormSignIn({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        navigate("/home")
      } else {
        r.json().then((flaw) => setErrors(flaw.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label> &nbsp;
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /> &nbsp;
        <label htmlFor="password">Password</label> &nbsp;
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /> &nbsp;
        <button type="submit">Sign In</button> &nbsp;
        {errors.map((err) => (
          <span key={err}>{err} &nbsp;</span> 
        ))}
    </form>
  );
}

export default FormSignIn;