import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { Link } from 'react-router-dom';

class SignIn extends Component {
  state = {
    username: '',
    password: ''
  };

  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSignIn = (event) => {
    const { username, password } = this.state;
    event.preventDefault();

    if (username.length <= 0 || password.length <= 0) {
      return alert('You must provide both username and password.');
    }
    return this.props.login({ username, password });
  };

  render() {
    return (
      <div>
        <div className="sign-in">
          Sign In:
        </div>
        <form onSubmit={this.handleSignIn}>
          <input
            className="input-username"
            value={this.state.username}
            name="username"
            type="text"
            placeholder="Username"
            onChange={this.handleOnChange}
            required
          />
          <br />
          <input
            className="input-password"
            value={this.state.password}
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleOnChange}
            required
          />
          <br />
          <input className="button" type="submit" value="Sign In" />
        </form>
        <br />
        <p>Don't have an account yet? <Link to='/signup'>Sign up for free!</Link></p>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  };
};

export default connect(mapStateToProps, { login })(SignIn);
