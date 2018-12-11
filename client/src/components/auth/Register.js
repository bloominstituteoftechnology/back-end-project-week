import React, { Component } from "react";
import "./auth.css";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: ""
    };
    this.api = "http://localhost:9000/api/register";
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();

    if (this.state.password === this.state.password2) {
      const newUser = {
        username: this.state.username,
        password: this.state.password
      };
      axios
        .post(this.api, newUser)
        .then(res => localStorage.setItem("token", res.data.token));
    }

    axios.post();
  };
  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.onSubmit}>
          <div className="login-icon-text">
            <i className="fas fa-user-plus" />
            <span>Sign Up</span>
          </div>
          <input
            type="text"
            placeholder="Enter a Username or Email"
            onChange={this.onChange}
            value={this.state.username}
            name="username"
            required
          />
          <input
            type="password"
            placeholder="Enter a Password"
            onChange={this.onChange}
            value={this.state.password}
            name="password"
            required
            minLength="6"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={this.onChange}
            value={this.state.password2}
            name="password2"
            required
            minLength="6"
          />
          <input type="submit" value="Sign Up" id="login-submit" />
        </form>
      </div>
    );
  }
}

export default Register;
