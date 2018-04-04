import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../actions';

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    passwordRepeat: '',
    message: null,
  };

  submitRegistration = event => {
    const { username, password, passwordRepeat } = this.state;
    if (!username || !password) this.setState({ message: 'Please enter a username and a password.'})
    if (password !== passwordRepeat) this.setState({ message: 'The passwords do not match.' });
    event.preventDefault();
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
      <div>
        <form onSubmit={this.submitRegistration}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="email"
            onChange={this.updateField}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.updateField}
          />
          <input
            type="password"
            name="passwordRepeat"
            value={this.state.repeatPassword}
            placeholder="confirm password"
            onChange={this.updateField}
          />
          <input type="submit" value="submit" />
        </form>
        {this.state.message && this.state.message}
      </div>
    );
  }
}

export default connect(null, { registerUser })(Register);