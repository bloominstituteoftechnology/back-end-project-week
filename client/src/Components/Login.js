import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange = e => {
    //works
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
    //works
    axios
      .post("http://localhost:5555/api/user/login", this.state)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        this.props.history.push("/notes");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  render() {
    console.log(this.state);
    return (
      <div className="formContainer">
        <div className="form-wrapper">
          <h1>Please Login to Access Notes</h1>
          <div className="input-wrapper">
            <label className="label">Username:</label>
            <input
              onChange={this.handleChange}
              name="username"
              type="text"
              value={this.state.username}
            />
          </div>
          <div className="input-wrapper">
            <label className="label">Password:</label>
            <input
              onChange={this.handleChange}
              name="password"
              type="password"
              value={this.state.password}
            />
          </div>
          <div className="button login-button" onClick={this.handleClick}>
            Log In
          </div>
          <Link to="/register">
            <div className="register-here">Click here to Register</div>
          </Link>
        </div>
      </div>
    );
  }
}

export default Login;
