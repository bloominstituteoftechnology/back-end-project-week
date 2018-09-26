import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';


const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto 0;
  display: flex;
  flex-flow: column;
  background-color: #342D33;
  color: #E3FFD5;
`;

class Login extends Component {

  render(){
    return (
      <LoginContainer>
        <h1>LOGIN</h1>
      </LoginContainer>
    )
  }
}

export default Login;