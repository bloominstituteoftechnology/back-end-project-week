import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Login</h1>
          <form>
            <input
              className="form-item"
              placeholder="Email goes here..."
              email="email address"
              type="email"
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <button
              className="submit"
              value="submit"
              type="button"
              onClick={this.handleFormSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleFormSubmit(e) {
    e.preventDefault();

    this.login(this.state.email, this.state.password).then(res => {
      this.props.history.push('/notes');
    });
  }
}

export default Login;
