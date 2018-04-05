import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    message: null,
  };

  submitLogin = event => {
    event.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ message: 'Please enter a username and a password.' });
      return;
    }
    this.props.login({ username, password }, this.props.history);
  };

  componentWillReceiveProps = (newProps) => {
    this.setState({ message: newProps.error });
  }

  updateField = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div className="login__container">
        <div className="login__header">Login:</div>
        { this.state.message && this.state.message }
        <form className="login__form" onSubmit={this.submitLogin}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="username"
            onChange={this.updateField}
            className="login__username-field"
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.updateField}
            className="login__password-field"
          />
          <div className="login__buttons">
            <input type="submit" value="Login" className="login__button" />
            <Link to="/register">
              <button className="login__button register">Register</button>
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
  };
};

export default connect(mapStateToProps, { login })(Login);
