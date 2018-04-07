import React, { Component } from 'react';
import axios from 'axios';
import { FormControl, FormGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import './CreateNewUser.css';

export default class CreateNewTodo extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleSetUsername = this.handleSetUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.CreateNewTodo = this.CreateNewTodo.bind(this);
  }

  handleSetUsername(e) {
    this.setState({ username: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  createUser(e) {
    e.preventDefault();
    const userToSave = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post('http://localhost:3030/newuser', userToSave)
      .then(shinynewuser => {
        localStorage.setItem('uuID', shinynewuser.data._id);
        setTimeout(() => {
          window.location = '/todos';
        }, 200);
      })
      .catch(err => {
        console.log({ err: err.response.error });
      });
  }

  render() {
    return (
      <form className="Login-form">
        <FormGroup className="Login-Group" controlID="formHorizontalEmail">
          User Name
          <FormControl
            id="formHorizontalEmail"
            className="form-control"
            onChange={this.handleSetUsername}
            placeHolder="User Name here"
            type="text"
            value={this.state.username}
          />
        </FormGroup>
        <FormGroup className="Login-Group" controlID="formHorizontalPassword">
          Password
          <FormControl
            id="formHorizontalPassword"
            className="form-control"
            onChange={this.handlePassword}
            placeHolder="User Name here"
            type="text"
            value={this.state.password}
          />>
          <Link to="/">Already a member? Login here</Link>
          <br />
          <Button className="btn btn-default" onClick={this.createUser}>
            Create New Account
          </Button>
        </FormGroup>
      </form>
    );
  }
}
