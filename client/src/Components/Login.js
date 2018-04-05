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

  userLogin = e => {
    e.preventDefault();
    let body = this.state;
    if (body.username === '' || body.password === '')
      return alert('Must have Username and Password to login.');
    fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.hasOwnProperty('success')) {
          this.setState({
            username: '',
            password: ''
          });
          this.props.main.handleLogin(res.id);
        } else {
          alert('Incorrect Login: Check Username and Password');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleNewUser = e => {
    e.preventDefault();
    let body = this.state;
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        if (res.hasOwnProperty('success')) {
          console.log(res);
          this.setState({
            username: '',
            password: ''
          });
          let id = res.newUser._id;
          this.props.main.handleLogin(id);
        } else {
          alert('Username already in use please choose another');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1 className="container">Welcome to Notes</h1>
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
          <button onClick={this.userLogin}>Login</button>
          <button onClick={this.handleNewUser}>Create New User</button>
        </form>
      </div>
    );
  }
}

export default Login;
