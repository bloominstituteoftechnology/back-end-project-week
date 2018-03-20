import React, { Component } from "react";
import { connect } from "react-redux";
import { loggedIn, signUp } from "../Actions";
import Navigation from "./Navigation";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      newAccount: false
    };
  }

  loginChangeHandler = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  loginAuth = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    if (password.length > 0 && username.length > 0) {
      return this.props.loggedIn(username, password);
    }
    return alert("Must include both a password and username");
  };

  signUpAuth = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;

    if (confirmPassword === password && username.length > 0) {
      return this.props.signUp(username, password);
    }
    return alert("Make sure to include a username and a matching password.");
  };

  signUpToggle = event => {
    event.preventDefault();
    const active = this.state.newAccount;
    this.setState({ newAccount: !active });
  };

  render() {
    return (
      <div className="HomePage">
        <Navigation />
        <div className="Login">
          <form style={this.state.newAccount ? { display: "none" } : null}>
            <div>Sign In</div>
            <br />
            {this.props.error ? (
              <h3 className="LogInError">Incorrect username/password</h3>
            ) : null}
            <br />
            <input
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.loginChangeHandler}
              name="username"
              required
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="password"
              value={this.state.password}
              onChange={this.loginChangeHandler}
              name="password"
              required
            />
            <br />
            <br />
            <button onClick={this.loginAuth}>Login</button>
            <br />
            <br />
            <br />
            <p>
              Need an account?{" "}
              <a href="" onClick={this.signUpToggle}>
                Sign Up
              </a>
            </p>
          </form>
          <form style={this.state.newAccount ? null : { display: "none" }}>
            <div>Sign Up</div>
            <input
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.loginChangeHandler}
              name="username"
              required
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="password"
              value={this.state.password}
              onChange={this.loginChangeHandler}
              name="password"
              required
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="confirm password"
              value={this.state.confirmPassword}
              onChange={this.loginChangeHandler}
              name="confirmPassword"
              required
            />
            <br />
            <br />
            <button onClick={this.signUpAuth}>Sign Up</button>
            <br />
            <br />
            <br />
            <p>
              Want to Sign In?{" "}
              <a href="" onClick={this.signUpToggle}>
                LogIn
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    error: state.error,
    signedUp: state.signedUp
  };
};

export default connect(mapStateToProps, { loggedIn, signUp })(LogIn);
