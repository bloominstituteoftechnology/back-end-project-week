import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './UserAuth.css';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
    this.setState({ title: '', body: '', });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="UserAuth">
      <h2 className="SectionTitle">Sign In</h2>
      <form className="UserAuth-Form">
        <input
          value={username}
          name="username"
          type="text"
          placeholder="Username"
          onChange={this.handleInputChange}
          maxLength="32"
          minLength="4"
          required
        />
        <br />
        <input
          value={password}
          name="password"
          type="password"
          placeholder="Password"
          onChange={this.handleInputChange}
          maxLength="32"
          minLength="4"
          required
        />
        <br />
        <Link to={"/"}><button onClick={(e) => this.handleSubmit(e)} type="submit">Sign In</button></Link>
        <Link to={"/signup"}><button>Sign Up</button></Link>
      </form>
      </div>
    );
  };
}

export default SignIn;
