import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
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
      <div className="col-md-6 col-sm-12 login-form">
      <h1>Lambda Notes</h1>
        {this.state.register ? <p>Register Now</p> : <p>Login</p>}
        <p>{this.props.authMessage}</p>
        <form onSubmit={this.handleFormSubmit}>
          <label for="username" >Email Address:</label>
          <input
            onChange={this.onChange}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <label for="password" >Password:</label>
          <input
            onChange={this.onChange}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          {this.state.register ? (
            <div>
              <label for="confirmPassword">Confirm Password:</label>
              <input
                onChange={this.onChange}
                type="password"
                name="confirmPassword"
                id="confirmPassword"
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
        {this.state.register ? <a className="log-link" onClick={this.register}> Already a Member? Login </a> : <a className="log-link" onClick={this.register}> Not a member? Register Now. </a> }
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
