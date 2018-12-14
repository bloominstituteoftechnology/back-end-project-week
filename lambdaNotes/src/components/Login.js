import React from "react";
import {
  LoginH1,
  LoginContainer,
  LambdaH1,
  LoginBackground,
  LoginGoogle
} from "../Styles";

const Login = props => {
  return (
    <LoginBackground>
      <LoginContainer>
        <LambdaH1>Lambda Notes</LambdaH1>
        <LoginH1>Login</LoginH1>
          <a href="/auth/google">
        <LoginGoogle />
          </a>
      </LoginContainer>
    </LoginBackground>
  );
};

export default Login;
