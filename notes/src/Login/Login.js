import React, { Component } from 'react';
//import { connect } from 'react-redux';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleUserInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  LoginUser = () => {
    const { username, password } = this.state;
    const LoginUser = { username, password };
    console.log(LoginUser);
    axios
      .post('http://localhost:5000/login', LoginUser)
      .then((res) => {
        console.log(res);
        window.location.href="http://localhost:3000";
      })
      .catch((err) => {
        console.error('There was an error logging in', err);
      });
  };

  render() {
    return (
      <div className="Login">
        <header className="Login-header">
          <h1 className="Login-title">Login to Lambda Notes!</h1>
        </header>
        <form>
          <input
            onChange={this.handleUserInput}
            name="username"
            type="text"
            placeholder="username"
          />
          <input
            onChange={this.handleUserInput}
            name="password"
            type="text"
            placeholder="password"
          />
          <button type="button" onClick={ () => this.LoginUser() }>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
