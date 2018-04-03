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
  
  render() {
    console.log(this.state);
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
          <button>Create New User</button>
        </form>
      </div>
    );
  }
}

export default Login;
