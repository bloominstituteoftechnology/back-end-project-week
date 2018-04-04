import React, { Component } from 'react'; // eslint-disable-line
import styled from 'styled-components';

// Styles
const LoginStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  height: 100vh;
  background-color: rgb(243, 243, 243);
  border-left: 1px solid rgb(151, 151, 151);
  border-right: 1px solid rgb(151, 151, 151);
  align-items: center;

  h2 {
    padding: 20px;
  }

  button {
    width: 100px;
    margin-top: 20px;
    height: 50px;
    background-color: rgb(94, 190, 195);
    color: #ffffff;
    outline: none;
    font-size: 0.9rem;
    font-weight: bold;
    border: none;

    &:hover {
      border: 2px solid white;
    }
  }

  input,
  textarea {
    outline: 1px solid rgba(0 0 0 0);
    border-style: solid;
    border: 1px solid grey;
    padding: 20px;
    margin: 10px;
    width: 50%;

    &:hover {
      border-style: solid;
      outline: 1px solid rgba(0 0 0 0);
      border: 1px solid black;
    }

    &:focus {
      outline: 1px solid rgb(94, 190, 195);
      border: 1px solid rgb(94, 190, 195);
      border-style: solid;
    }
  }
`;

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleUsernameInput = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordInput = event => {
    this.setState({ password: event.target.value });
  };

  handleLogin = () => {
    let userInfo = { username: this.state.username, password: this.state.password };
    this.props.loginUser(userInfo);
    this.setState({ username: '', password: '' });
  };

  render() {
    return (
      <LoginStyled>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="Input_Username"
          value={this.state.username}
          onChange={this.handleUsernameInput}
        />
        <input
          type="password"
          placeholder="Password"
          className="Input_Password"
          value={this.state.password}
          onChange={this.handlePasswordInput}
        />
        <button onClick={this.handleLogin}>Login</button>
      </LoginStyled>
    );
  }
}

export default Login;
