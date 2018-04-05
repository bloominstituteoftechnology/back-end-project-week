import React, { Component } from 'react'; // eslint-disable-line
import styled from 'styled-components';
import axios from 'axios';
import { SERVER_URL } from '../config'

// Styles
const SignupStyled = styled.div`
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

  h3 {
    margin: 10px;
    color: red;
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

// Signup Component
class Signup extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    passwordMatch: true
  };

  handleUsernameInput = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordInput = event => {
    if (event.target.value === this.state.confirmPassword) {
      this.setState({ passwordMatch: true, password: event.target.value });
    } else {
      this.setState({ passwordMatch: false, password: event.target.value });
    }
  };

  handleConfirmPasswordInput = event => {
    if (this.state.password === event.target.value) {
      this.setState({
        passwordMatch: true,
        confirmPassword: event.target.value
      });
    } else {
      this.setState({
        passwordMatch: false,
        confirmPassword: event.target.value
      });
    }
  };

  handleSignup = () => {
    if (!this.state.username || !this.state.password) return;
    if (!this.state.passwordMatch) return;
    let newUserInfo = {
      username: this.state.username,
      password: this.state.password
    };

    axios
      .post(`${SERVER_URL}/users`, newUserInfo)
      .then(res => {
        this.setState({
          username: '',
          password: '',
          confirmPassword: '',
          passwordMatch: true
        });
      })
      .then(() => this.props.showLogin())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <SignupStyled>
        <h2>Signup</h2>
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
        <input
          type="password"
          placeholder="Confirm password"
          className="Input_ConfirmPassword"
          value={this.state.confirmPassword}
          onChange={this.handleConfirmPasswordInput}
        />
        <button onClick={this.handleSignup}>Sign Up</button>
        {!this.state.passwordMatch && <h3>Passwords do not match</h3>}
      </SignupStyled>
    );
  }
}
export default Signup;
