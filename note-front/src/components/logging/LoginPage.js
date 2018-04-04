import React, { Component } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

class LoginPage extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Welcome!</h1>
          <div>
            <h1>Log in</h1>
            <Login />
          </div>
          <div>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </div>
        </header>
      </div>
    );
  }
}
export default LoginPage;
