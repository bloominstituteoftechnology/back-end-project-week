import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { view_button_click, load_user_notes, new_user_creation, user_login } from '../actions/index';

import './css/Login.css';

class Login extends React.Component {
  state = {
    user: '',
    pass: '',
    newUser: '',
    newPass: '',
  };

  render() {
    return (
      <div className="login">
        <div className="login-body">
          <h1 className="login-header"> Sign In To Your Notes</h1>
          <label> Username </label>
          <input placeholder="username" value={this.state.user} onChange={this.handleUserChange} />
          <label> Password </label>
          <input
            type="password"
            placeholder="password"
            value={this.state.pass}
            onChange={this.handlePassChange}
          />
          <button className="login-button" onClick={this.loginClicked}>
            {' '}
            Login{' '}
          </button>
          <h1 className="new-header"> No Account? Create One Below </h1>
          <label> Username </label>
          <input placeholder="username" value={this.state.newUser} onChange={this.handleNewUserChange} />
          <label> Username (Must Be At Least 8 Characters)</label>
          <input
            type="password"
            placeholder="password"
            value={this.state.newPass}
            onChange={this.handleNewPassChange}
          />
          <button className="login-button" onClick={this.createClicked}>
            {' '}
            Create New{' '}
          </button>
        </div>
      </div>
    );
  }

  handleUserChange = (event) => {
    this.setState({ user: event.target.value });
  };
  handlePassChange = (event) => {
    this.setState({ pass: event.target.value });
  };
  handleNewUserChange = (event) => {
    this.setState({ newUser: event.target.value });
  };
  handleNewPassChange = (event) => {
    this.setState({ newPass: event.target.value });
  };
  loginClicked = (event) => {
    if (this.state.user === '' || this.state.pass === '') {
      alert('You must enter a username and password to login.');
      this.setState({ user: '', pass: '' });
    } else if (this.state.pass.length < 8) {
      alert('Your password is at least 8 characters.');
      this.setState({ pass: '' });
    } else {
      event.preventDefault();
      const user = {
        username: this.state.user,
        password: this.state.pass,
      };
      axios
        .post('https://pure-sands-16313.herokuapp.com/notes/login', user)
        .then((data) => {
          var instance = axios.create();
          instance.defaults.headers.common['Authorization'] = data.data.token;
          const userID = data.data.user._id;
          axios.get('https://pure-sands-16313.herokuapp.com/notes/' + userID).then((notes) => {
            this.props.user_login(userID, notes);
            return;
          });
        })
        .catch((error) => {
          alert('You Entered An Incorrect Username or Password.');
          this.setState({ user: '', pass: '' });
        });
    }
  };

  createClicked = (event) => {
    if (this.state.newUser === '' || this.state.newPass === '') {
      alert('You must enter a username and password to create a new account.');
      this.setState({ newUser: '', newPass: '' });
    } else if (this.state.newPass.length < 8) {
      alert('Your password must be at least 8 characters.');
      this.setState({ newPass: '' });
    } else {
      event.preventDefault();
      const newUser = {
        username: this.state.newUser,
        password: this.state.newPass,
      };
      axios
        .post('https://pure-sands-16313.herokuapp.com/notes/createuser', newUser)
        .then((data) => {
          axios.post('https://pure-sands-16313.herokuapp.com/notes/login', newUser).then((data) => {
            var instance = axios.create();
            instance.defaults.headers.common['Authorization'] = data.data.token;
            const userID = data.data.user._id;
            axios.get('https://pure-sands-16313.herokuapp.com/notes/' + userID).then((notes) => {
              this.props.user_login(userID, notes);
              return;
            });
          });
        })
        .catch((error) => {
          alert('Username already exists, please try again');
          this.setState({ newUser: '' });
        });
    }
  };
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    note: state.note,
  };
};

export default connect(mapStateToProps, {
  view_button_click,
  load_user_notes,
  new_user_creation,
  user_login,
})(Login);
