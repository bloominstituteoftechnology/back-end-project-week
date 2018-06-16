import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Regiseter extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  inputChangeHandler = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  submitHandler = e => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/users/register", this.state)
      .then(response => {
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err);
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
    return (
      <div>
        <h1>Create new Account</h1>
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
          </div>
          <br />
          <input type="checkbox" onClick={this.pwToggler} />Show Password
          <div>
            <button>Create Account</button>
          </div>
        </form>
        <br />
        <p>Already have an account?</p>
        <Link to="/login">
          <button>Login right now!</button>
        </Link>
      </div>
    );
  }
}
