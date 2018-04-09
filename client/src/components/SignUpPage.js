import React from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
export default class SignUpPage extends React.Component {

  state = {
    username: "",
    password: "",
    success: null,
    errorMessage: ""
  };

  handleUsernameChange = event => {
    this.setState({username: event.target.value});
  };

  handlePasswordChange = event => {
    this.setState({password: event.target.value});
  };

  login = () => {
    axios.post("http://localhost:5000/api/login", {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      this.setState({
        success: true,
        errorMessage: ""
      });
      window.localStorage.setItem("jwt_token", res.data.token);
      this.props.history.push("/notes");
    }, () => {
      this.setState({
        success: false,
        errorMessage: "An error occurred. Please contact administrator!"
      })
    });
  };

  signUp = event => {
    axios.post("http://localhost:5000/api/users", {
      username: this.state.username,
      password: this.state.password
    }).then(res => {
      this.login();
    }, err => {
      this.setState({
        success: false,
        errorMessage: "An error occurred. Please contact administrator!"
      })
    });
    event.preventDefault();
  };

  render() {
    const {
      username,
      password,
      success,
      errorMessage
    } = this.state;

    return (
      <form onSubmit={this.signUp}>
        <h4 style={{marginBottom: "20px"}}>Sign up for an account</h4>
        <div className="input-field">
          <input type="text" name="username" value={username} required={true}
                 onChange={this.handleUsernameChange} placeholder="Username"/>
        </div>
        <div className="input-field">
          <input type="password" name="password" value={password} required={true}
                 onChange={this.handlePasswordChange} placeholder="Password"/>
        </div>
        <div>
          <div style={{marginTop: "15px"}}>
            <Button type="submit">
              Submit
            </Button><div>
              <i>
                If you have an account, <NavLink to="/">Login</NavLink>
              </i>
            </div>
          </div>
        </div>
        <div>
          {success === false && errorMessage !== "" && (
            <div style={{marginTop: "15px", color: "red"}}>
              {errorMessage}
            </div>
          )}
        </div>
      </form>
    );
  }
}