import React, { Component } from "react";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSumbit = e => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSumbit}>
          <h2>Sign Up</h2>
          <input
            type="text"
            name="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="username"
          />
          <input
            type="text"
            name="first"
            id="first"
            value={this.state.first}
            onChange={this.handleChange}
            placeholder="first name"
          />
          <input
            type="text"
            name="last"
            id="last"
            value={this.state.last}
            onChange={this.handleChange}
            placeholder="last name"
          />
          <input
            type="text"
            name="email"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="password"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
