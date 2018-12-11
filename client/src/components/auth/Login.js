import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      username: ""
    };
    this.api = "http://localhost:9000/api/login";
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();

    axios
      .post(this.api, this.state)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userID", res.data.id);
          this.props.setNotes();
          this.props.history.push("/");
        } else {
          console.log(res);
        }
      })
      .catch(err => alert("invalid user credentials"));
  };
  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.onSubmit}>
          <div className="login-icon-text">
            <i className="fas fa-lock" />
            <span>Login</span>
          </div>
          <input
            type="text"
            placeholder="Enter your Username or Email"
            onChange={this.onChange}
            value={this.state.username}
            name="username"
          />
          <input
            type="password"
            placeholder="Enter your Password"
            onChange={this.onChange}
            value={this.state.password}
            name="password"
          />
          <input type="submit" value="Login" id="login-submit" />
          <Link to="/register">
            <h4>Don't have an account? Sign up here</h4>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
