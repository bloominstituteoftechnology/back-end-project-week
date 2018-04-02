import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = _ => {
    const { username, password } = this.state;
    this.props.login(username, password, this.props.history);
    this.setState({ title: '', body: '', });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="SignIn">
      <h2 className="SectionTitle">Sign In</h2>
      <form onSubmit={this.handleSubmit}>
        <input
          className="SignIn-UsernameBox"
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
          className="SignIn-PasswordBox"
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
        <Link to={"/"}><button onClick={() => this.handleSubmit()} type="submit">Sign In</button></Link>
        <Link to={"/signup"}><button>Sign Up</button></Link>
      </form>
      </div>
    );
  };
}

export default SignIn;
