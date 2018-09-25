import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: ""
    };
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  login = async () => {
    if (this.state.password !== this.state.password2) {
      return;
    }
    try {
      let response = await axios.post("http://localhost:3000/login", {
        username: this.state.username,
        password: this.state.password
      });
      localStorage.setItem("JWT", response.data.token);
      this.props.history.push("/login");
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className="loginContainer">
        <Link className="reglink" to="/login">
          Login
        </Link>

        <div className="registerTitle">REGISTER:</div>
        <div>
          <label>Username:</label>
          <input
            onChange={this.handleInputChange}
            type="text"
            name="username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            onChange={this.handleInputChange}
            type="password"
            name="password"
          />
        </div>
        <div>
          <label>Repeat Password:</label>
          <input
            onChange={this.handleInputChange}
            type="password"
            name="password2"
          />
        </div>
        <div>
          <input onClick={this.login} type="submit" value="Register" />
        </div>
      </div>
    );
  }
}

export default Register;
