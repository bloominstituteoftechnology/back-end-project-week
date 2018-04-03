import React, { Component } from 'react';

import './UserAuth.css';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    success: false,
    error: null,
  };

  handleNewUser = async function(username, password) {
    try {
      const res = await this.props.axios.post(`${this.props.ROOT_URL}/users`, { username, password });
      if (res.data.status.name === "ValidationError") {
        this.setState({ 
          success: false,
          error: 'Please input both a username and a password.'
        });
      };
      if (res.data.status.code === 11000) {
        this.setState({ 
          success: false,
          error: 'That username is unavailable, please try another.'
        });
      };
      if (res.data.status === "success") {
        this.setState({
          error: null,
          success: true,
        });
        setTimeout(() => {
          window.location = '/';
        });
      }
    } catch (err) {
      console.log(err);
      this.setState({ error: 'Something broke, check the console.' });
    };
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    const { username, password } = this.state;
    if (username.length < 4) {
      return this.setState({
        success: false,
        error: 'Username must be at least 4 characters long.'
      });
    };
    if (password.length < 4) {
      return this.setState({
        success: false,
        error: 'Password must be at least 4 characters long.'
      });
    };
    this.handleNewUser(username, password);
    this.setState({ title: '', body: '', });
    event.preventDefault();
  };

  renderAlert = _ => {
    if (!this.state.error) return null;
    return <h3 className="UserAuth-Error">{this.state.error}</h3>;
  };
  render() {
    const { username, password } = this.state;

    return (
      <div className="UserAuth">
      <h2 className="SectionTitle">Sign Up</h2>
      <form className={"UserAuth-Form"}>
        <input
          value={username}
          name="username"
          type="text"
          placeholder="Username"
          onChange={this.handleInputChange}
          minLength="4"
          maxLength="32"
          required
        />
        <br />
        <input
          value={password}
          name="password"
          type="password"
          placeholder="Password"
          onChange={this.handleInputChange}
          minLength="4"
          maxLength="32"
          required
        />
        <br />
        <button onClick={(e) => this.handleSubmit(e)} type="submit">Create Account</button>
      </form>
      {this.renderAlert()}
      </div>
    );
  };
}

export default SignUp;
