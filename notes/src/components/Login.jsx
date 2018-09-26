import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

require('dotenv').config()

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message:null
    };
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  login = async () => {
    try {
      let response = await axios.post(`${process.env.URL ||"http://localhost:9001/"}auth/login`, {
        username: this.state.username,
        password: this.state.password
      });
      localStorage.setItem("JWT", response.data.token);
      this.props.logchange();
    } catch (err) {
      if(err.response.status ===400){
        this.setState({
          message:"Username or password wrong"
        })
      }
      console.log(err.response);
    }
  };
  render() {
    return (
      <div className="loginContainer">
        <Link className="reglink" to="/register">
          Register
        </Link>
        <div className="registerTitle">Login:</div>

        <div>
          <label>Username:</label>
          <input
            onChange={this.handleInputChange}
            type="text"
            name="username"
          />
        </div>
        <div>
          {process.env.URL}
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
        <div>
          {this.state.message ? this.state.message :""}
        </div>
      </div>
    );
  }
}

export default Login;
