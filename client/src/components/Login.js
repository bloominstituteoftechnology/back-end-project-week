import React, { useState, useEffect } from "react";
import {
  LoginInput,
  StyledForm,
  LoginFormWrapper,
  LoginWrapper,
  LoginButton,
  LoginHeader
} from "../styles";

import { URL, DEFAULT_USER_VALUES } from "../constants";

import axios from "axios";

const Login = ({ history }) => {
  const [input, setInput] = useState(DEFAULT_USER_VALUES);
  useEffect(() => localStorage.removeItem("token"), []);
  const handleChange = e =>
    setInput({ ...input, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`${URL}/login`, input)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        setInput(DEFAULT_USER_VALUES);
        window.location.reload();
        history.push("/");
      })
      .catch(err => {
        console.error(err);
        setInput(DEFAULT_USER_VALUES);
      });
  };
  return (
    <LoginWrapper>
      <LoginFormWrapper>
        <StyledForm>
          <LoginHeader>Lambda Notes</LoginHeader>
          <LoginInput
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
            value={input.username}
          />
          <LoginInput
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={input.password}
          />
          <LoginButton onClick={handleSubmit} onSubmit={handleSubmit}>
            Log In
          </LoginButton>
        </StyledForm>
      </LoginFormWrapper>
    </LoginWrapper>
  );
};

export default Login;
