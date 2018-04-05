import React, { Component } from 'react';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleInput = e => {
    e.preventDefault();
    return this.setState({ [e.target.name]: e.target.value });
  };
  handleNewUser = e => {
    e.preventDefault();
    let body = this.state;
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(pass => pass.json())
      .then(pass => {
        if (pass.hasOwnProperty('success')) {
          console.log({ pass });
          this.setState({
            username: '',
            password: ''
          });
          this.props.main.handleLogin();
        } else {
          alert('Username already in use please choose another');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log({ newUser: this.state });
    console.log({ props: this.props });
    return (
      <div className="login">
        <h1 className="loginTitle">Welcome to Notes</h1>
        <form>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleInput}
          />
          <input
            name="password"
            type="text"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleInput}
          />
          <button>Login</button>
          <button onClick={this.handleNewUser}>Create New User</button>
        </form>
      </div>
    );
  }
}

export default Login;
