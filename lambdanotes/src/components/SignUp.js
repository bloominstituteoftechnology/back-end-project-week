import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
      }
    } catch (err) {
      this.setState({ error: err });
    };
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    const { username, password } = this.state;
    this.handleNewUser(username, password);
    this.setState({ title: '', body: '', });
    event.preventDefault();
  };

  renderAlert = _ => {
    if (!this.state.error) return null;
    return <h3 className="UserAuth-Error">{this.state.error}</h3>;
  };

  renderRedirect = _ => {
    if (!this.state.success) return null;
    return <Redirect to={"/"} />;
  }

  render() {
    const { username, password } = this.state;

    return (
      <div className="UserAuth">
      {this.renderRedirect()}
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
        {this.renderAlert()}
        <button onClick={(e) => this.handleSubmit(e)} type="submit">Create Account</button>
      </form>
      </div>
    );
  };
}

export default SignUp;
