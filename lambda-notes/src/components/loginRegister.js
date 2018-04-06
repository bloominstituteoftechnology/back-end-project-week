import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, register } from '../actions/actions';
import { Link } from 'react-router-dom';
import './LoginRegister.css';

class SignUpLogin extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    register: false,
  };
  register = (e) => {
    this.setState({ register: !this.state.register });
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleFormSubmit = () => {
    const { username, password, confirmPassword } = this.state;
    if ((username, password, confirmPassword)) {
      this.props.register(username, password, confirmPassword);
    } else if ((username, password && !confirmPassword)) {
      this.props.login(username, password);
    }
    if (this.props.isAuth) {
      this.setState({
        username: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.register ? <p>Register Now</p> : <p>Login</p>}
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            onChange={this.onChange}
            type="text"
            name="username"
            placeholder="Username"
          />
          <label>Password:</label>
          <input
            onChange={this.onChange}
            type="password"
            name="password"
            placeholder="Password"
          />
          {this.state.register ? (
            <div>
              <label>Confirm Password:</label>
              <input
                onChange={this.onChange}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
          ) : null}
          {this.props.isAuth ? (
              <Link className="d-block" to="/notes">
                <button type="button" className="btn">
                  Continue
                </button>
              </Link>
              
          ) : (
              <button
                type="button"
                className="btn"
                onClick={this.handleFormSubmit}
              >
                {this.state.register ? 'Sign Up' : 'Login'}
              </button>
          )}
        </form>
        {this.state.register ? <a onClick={this.register}> Already a Member? Login </a> : <a onClick={this.register}> Not a member? Register Now. </a> }
        <p>{this.props.authMessage}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.isAuth,
    authMessage: state.authMessage,
    error: state.error,
  };
};

export default connect(mapStateToProps, { login, register })(SignUpLogin);
