import React from 'react';
import axios from 'axios';

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
    axios
      .post('http://localhost:3030/register', { username, password })
      .then(response => {
        console.log('response', response);
        if (response.status === 200) {
          this.props.history.push('/');
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
        <form onSubmit={this.submitRegistration}>
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

export default Register;