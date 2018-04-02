import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

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
    this.props.login({ username, password });
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
