import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './UserAuth.css';

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    error: null,
  };

  login = async (username, password) => {
    if (!username || !password) {
      return this.setState({
        error: 'Please input a valid email address and password.'
      });
    };
    try {
      const res = await this.props.axios.post(`${this.props.ROOT_URL}/login`, { username, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      this.props.authenticate();
    } catch (err) {
      this.setState({
        error: 'Invalid username or password.'
      });
    };
  };

  handleInputChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.login(username, password);
    this.setState({ title: '', body: '', });
  };

  renderAlert = _ => {
    if (!this.state.error) return null;
    return <h3 className="UserAuth-Error">{this.state.error}</h3>;
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
      {this.renderAlert()}
      </div>
    );
  };
}

export default SignIn;
