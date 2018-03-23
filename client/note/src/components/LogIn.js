import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loggedIn, register } from '../actions';
import './LogIn.css';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPW: '',
      newUser: false
    };
  }

  logInChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  logInAuthorization = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    if(password.length > 0 && username.length > 0) {
      return this.props.loggedIn(username, password);
    }

    return alert('You must include both username and password');
  };

  registrationAuth = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const confirmPW = this.state.confirmPW;

    if(confirmPW === password && username.length > 0) {
      return this.props.register(username, password);
    }

    return alert('Must supply a username and passwords must match');
  };

  registrationToggle = event => {
    event.preventDefault();
    const current = this.state.newUser;
    this.setState({ newUser: !current });
  };

  render() {
    return (
      <div className="Home">
        <div className="LogInForm">
          <form style={this.state.newUser ? { display: 'none' } : null}>
            <div>Sign In:</div>
            <br />
            <input
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.logInChangeHandler}
              name="username"
            />
            <input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.logInChangeHandler}
              name="password"
            />
            <br />
            <button onClick={this.logInAuthorization}>Log In</button>
            <br />
            <br />
            <br />
            <div>Register for an account:</div>
            <br />
            <button onClick={this.registrationToggle}>Create An Account</button>
          </form>
          <form style={this.state.newUser ? null : { display: 'none' }}>
            <div>Sign up</div>
            <br />
            <input
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.logInChangeHandler}
              name="username"
            />
            <input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.logInChangeHandler}
              name="password"
            />
            <input
              type="password"
              placeholder="confirm password"
              value={this.state.confirmPW}
              onChange={this.logInChangeHandler}
              name="confirmPW"
            />
            <br />
            <br />
            <button onClick={this.registrationAuth}>Sign Up</button>
            <br />
            <br />
            <br />
            <div>Already have an account? Sign in instead</div>
            <br />
            <button onClick={this.registrationToggle}>Sign In</button>
          </form>
        </div>
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    signedUp: state.signedUp,
    username: state.username
  }
}

export default connect(MapStateToProps, { loggedIn, register })(LogIn);