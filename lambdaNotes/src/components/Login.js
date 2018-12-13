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
      <LambdaH1>Lambda Notes</LambdaH1>
      <LoginContainer>
        <LoginH1>Login</LoginH1>
        <LoginGoogle href="/auth/google"></LoginGoogle>
      </LoginContainer>
    </LoginBackground>
  );
};

export default Login;
