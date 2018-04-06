import React, { Component } from 'react';
//import { connect } from 'react-redux';
import axios from 'axios';
import './Signup.css';

class Signup extends Component {
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

  addUser = () => {
    const { username, password } = this.state;
    const newUser = { username, password };
    console.log(newUser);
    axios
      .post('http://localhost:5000/users', newUser)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error('There was an error signing up', err);
      });
  };

  render() {
    return (
      <div className="Signup">
        <header className="Signup-header">
          <h1 className="Signup-title">Signup for Lambda Notes!</h1>
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
          <button type="button" onClick={ () => this.addUser() }>
            Signup
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
