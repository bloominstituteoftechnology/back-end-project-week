import React, { Component } from 'react';
import axios from 'axios';
import './Auth.css';

class AccountCreate extends Component {
  state = {
  username: '',
  password: '',
  requestError: false
};
  saveUser = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      // using "this.state "also works when posting a user
      .post('http://localhost:5000/users', { username, password })
      .then(re => {
        console.log(re);
      })
      .catch(err => {
        console.log(err);
        this.setState({ requestError: true });
        setTimeout(() => {
          this.setState({ requestError: false });
        }, 3000);
      });
  }

  handleInputChange = (e) => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    // console.log(this.props);
    const { username, password } = this.state;
    return (
      <form >
        <h2>Create Account</h2>
        {this.state.requestError ? <h4>Error Creating Account</h4> : null}
        <input
          onChange={this.handleInputChange}
          type='email'
          name='username'
          value={username}
        />
        <input
          onChange={this.handleInputChange}
          type='password'
          name='password'
          value={password}
        />
        <button onClick={this.saveUser}>Create User</button>
        <p className="accountCreate" onClick={() => {this.props.togglelogin('createAccount')}}> Already have an account ?</p>
      </form>
    );
  }
}

export default AccountCreate;
