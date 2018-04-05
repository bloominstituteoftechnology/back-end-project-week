import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions';
import '../styles/Register.css';

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    passwordRepeat: '',
    message: null,
  };

  componentWillReceiveProps = (newProps) => {
    this.setState({ message: newProps.error.response.data.msg });
  }

  submitRegistration = event => {
    event.preventDefault();
    const { username, password, passwordRepeat } = this.state;
    if (!username || !password) {
      this.setState({ message: 'Please enter a username and a password.' });
      return;
    }
    if (password !== passwordRepeat) {
      this.setState({ message: 'The passwords do not match.' });
      return;
    }
    this.props.registerUser({ username, password });
    this.props.history.push('/');
  };

  updateField = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };
  
  render() {
    return (
      <div className="register__container">
        <div className="register__header">Create a new account:</div>
      {this.state.message && this.state.message}
        <form className="register__form" onSubmit={this.submitRegistration}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="email"
            onChange={this.updateField}
            className="register__username-field"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.updateField}
            className="register__password-field"
          />
          <input
            type="password"
            name="passwordRepeat"
            value={this.state.repeatPassword}
            placeholder="confirm password"
            onChange={this.updateField}
            className="register__password-field"
          />
          <div className="register__buttons">
            <input type="submit" value="Submit" className="register__button" />
            <Link to="/login">
              <button className="register__button login">Back to login</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
  }
}

export default connect(mapStateToProps, { registerUser })(Register);
