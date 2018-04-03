import React from 'react';
import axios from 'axios';
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
    const { username, password } = this.state;
    if (!username || !password) this.setState({ message: 'Please enter a username and a password.'})
    event.preventDefault();
    axios
      .post('http://localhost:3030/login', { username, password })
      .then(response => {
        console.log('response', response);
        if (response.status === 200) {
          this.props.login(response.data);
          this.props.history.push('/');
        } else if (response.status === 404) {
          this.setState({ message: 'The username or password is incorrect.' });
        }
      })
      .catch(err => {
        console.log(err);
      });
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
        <Link to='/register'><button>Register an account</button></Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authed: state.authed,
  };
};

export default connect(mapStateToProps, { login })(Login);
