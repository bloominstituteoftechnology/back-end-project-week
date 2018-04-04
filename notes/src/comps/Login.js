import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import { Link } from 'react-router-dom';

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
    }
    this.props.login({ username, password }, this.props.history);
  };

  updateField = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitLogin}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="username"
            onChange={this.updateField}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.updateField}
          />
          <input type="submit" value="submit" />
        </form>
        {this.state.message && this.state.message}
        <Link to="/register">
          <button>Register an account</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authed: state.authed,
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, { login })(Login);
