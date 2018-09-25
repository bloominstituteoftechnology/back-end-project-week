import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      message:null
    };
  }
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  login = async () => {
    if (this.state.password !== this.state.password2) {
      this.setState({
        message:"Passwords don't match"
      })
      return;
    }
    try {
      let response = await axios.post("http://localhost:3000/auth/register", {
        username: this.state.username,
        password: this.state.password
      });
      localStorage.setItem("JWT", response.data.token);
      this.props.history.push("/login");
    } catch (err) {
      if(err.response.data.errno ===19){
        this.setState({
          message:"Username taken"
        })
      }
      console.log(err.response);
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
        <div>
          {this.state.message ? this.state.message :""}
        </div>
      </div>
    );
  }
}

export default Register;
