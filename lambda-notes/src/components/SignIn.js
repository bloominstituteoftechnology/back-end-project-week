import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { Link } from 'react-router-dom';
// import {
// Redirect
// } from 'react-router-dom';

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
    const { history } = this.props;
    event.preventDefault();

    if (username.length <= 0 || password.length <= 0) {
      return alert('You must provide both username and password.');
    }
    this.props.login(username, password, history);
  };

  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{ this.props.error }</h3>
  }

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
          {this.renderAlert()}
        </form>
        <br />
        <p>Don't have an account yet? <Link to='/signup'>Sign up for free!</Link></p>
        {/* { this.props.userAuthenticated ? <Redirect path='/notes' /> : null } */}
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
    error: state.auth.error 
  };
};

export default connect(mapStateToProps, { login })(SignIn);
