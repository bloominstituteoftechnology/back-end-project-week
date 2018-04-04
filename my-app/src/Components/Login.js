import React, { Component } from "react";
import axios from "axios";
import "./Auth.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
    requestError: false
  };
  loginUser = e => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post("http://localhost:5000/login", { username, password })
      .then(re => {
        this.props.showMe();
        console.log(re);
      })
      .catch(err => {
        console.log(err);
        this.setState({ requestError: true });
        setTimeout(() => {
          this.setState({ requestError: false });
        }, 3000);
      });
  };

  handleInputChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    // console.log(this.props);
    const { username, password } = this.state;
    return (
      <form>
        <h2>User Login Account</h2>
        {this.state.requestError ? (
          <h4>Error Logging import {} from "module";</h4>
        ) : null}
        <input
          onChange={this.handleInputChange}
          type="email"
          name="username"
          value={username}
        />
        <input
          onChange={this.handleInputChange}
          type="password"
          name="password"
          value={password}
        />
        <button onClick={this.loginUser}>Login</button>
        <p
          className="login"
          onClick={() => {
            this.props.togglelogin("login");
          }}
        >
          {" "}
          Need an account ? Create One
        </p>
      </form>
    );
  }
}

export default Login;
