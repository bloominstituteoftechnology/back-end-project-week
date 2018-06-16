import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./Login.css";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      pwShowToggle: false,
      isWrongCred: false
    };
  }

  inputChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = e => {
    const login = axios.post(
      "http://localhost:5000/api/users/login",
      this.state
    );

    e.preventDefault();

    login
      .then(response => {
        localStorage.setItem("token", response.data.token);
        this.props.history.push("/notes");
        // console.log(localStorage.getItem("token"));
      })
      .catch(err => {
        localStorage.removeItem("token");
        this.setState({ isWrongCred: true });
        this.setState({ password: "" });
      });
  };

  pwToggler() {
    const pwToggle = document.getElementById("pwInput");

    if (pwToggle.type === "password") {
      pwToggle.type = "text";
    } else {
      pwToggle.type = "password";
    }
  }

  render() {
    // console.log("Login page",localStorage);
    return (
      <div className="Login-body">
        <div className="Login-subBody">
          <img
            className="CIA-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Seal_of_the_Central_Intelligence_Agency.svg/2000px-Seal_of_the_Central_Intelligence_Agency.svg.png"
          />
          <h1>Restricted Access</h1>
          <form className="Login-form-body" onSubmit={this.submitHandler}>
            <div className="IDpassword-body">
              <p className="display">ID</p>
              <input
                className="input"
                name="username"
                value={this.state.username}
                onChange={this.inputChangeHandler}
                type="text"
              />
            </div>
            <div className="IDpassword-body">
              <p className="display">Password</p>
              <input
                className="input"
                name="password"
                value={this.state.password}
                onChange={this.inputChangeHandler}
                type="password"
                id="pwInput"
              />
            </div>
            <div>
              <input type="checkbox" onClick={this.pwToggler} />Show Password
            </div>
            <br />
            <div>
              <button>Sign in</button>
            </div>
          </form>
          <div>
            <div>
              {this.state.isWrongCred ? (
                <h2 className="loginErrorMsg">
                  Your username/password was incorrect.
                </h2>
              ) : null}
            </div>

            <br />
            <div>
              Don't have an assigned ID?
              <br />
              <br />
              <Link to="/register">
                <button>Request New ID</button>
              </Link>
            </div>
          </div>
        </div>
        <p className="footnote">
          <sub>btw, this page is not real. :)</sub>
        </p>
      </div>
    );
  }
}
