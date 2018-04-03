import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  handleOnChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSignUp = (event) => {
    const { username, password, confirmPassword } = this.state;
    event.preventDefault();
    if (confirmPassword !== password) {
      return alert('Passwords do not match')
    } else if (username.length < 6) {
      return alert('Username name must be 6 characters or longer');
    } else if (password.length < 7) {
      return alert('Password must be 7 characters or longer');
    } else {
      return this.props.createUser(username, password);
    }
  };

  render() {
    return (
      <div>
        <div className="sign-up">
          Create New Account:
        </div>
        <form onSubmit={this.handleSignUp}>
          <input
            className="input-username"
            value={this.state.username}
            name="username"
            type="text"
            placeholder="Username"
            onChange={this.handleOnChange}
            required
          />
          <br />
          <input
            className="input-password"
            value={this.state.password}
            name="password"
            type="password"
            placeholder="Password"
            onChange={this.handleOnChange}
            required
          />
          <br />
          <input
            className="input-password"
            value={this.state.confirmPassword}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleOnChange}
            required
          />
          <br />
          <input className="button" type="submit" value="Register" />
        </form>
        <br />
        <p>Already have an account? <Link to='/signin'>Sign in</Link></p>

      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    createUser: state.createUser
  };
};

export default connect(mapStateToProps, { createUser })(SignUp);
