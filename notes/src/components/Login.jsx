import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  login = async () => {
    try {
    let response = await axios.post("http://localhost:3000/login", {
        username: this.state.username,
        password: this.state.password
      });
      localStorage.setItem('JWT', response.data.token);
      this.props.logchange();
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className="loginContainer">
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
          <input onClick={this.login} type="submit" value="Log In" />
        </div>
      </div>
    );
  }
}

export default Login;
