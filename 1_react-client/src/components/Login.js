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
          <h1>Sign in</h1>
          <form onSubmit={this.submitHandler}>
            <div>
              <input
                name="username"
                value={this.state.username}
                onChange={this.inputChangeHandler}
                type="text"
              />
            </div>
            <div>
              <input
                name="password"
                value={this.state.password}
                onChange={this.inputChangeHandler}
                type="password"
                id="pwInput"
              />
              <br />
              <input type="checkbox" onClick={this.pwToggler} />Show Password
            </div>
            <div>
              <button>Sign in</button>

              <br />
              <br />

              <div>
                {this.state.isWrongCred ? (
                  <h2>Your username/password was incorrect.</h2>
                ) : null}
              </div>

              <br />
              <div>
                Don't have account?
                <br />
                <Link to="/register">
                  <button>Sign Up!</button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
