import React, { Component } from 'react';
import axios from 'axios'


class Signin extends Component {
  state = {
    username: '',
    password: ''
  }

  handler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', this.state)
    .then(res => {
      const token = res.data;
      localStorage.setItem('jwt', token);
      this.props.history.push('/home')
    })
    .catch(err => {
      console.log('axios failed:', err.message)
    })
  }

  register = e => {
    this.props.history.push('/signup')
  }

  render() {
    return (
      <div className='signin'>
        <h1>Please log in...</h1>
        <form onSubmit={this.submitHandler}>
          <input
          name= 'username'
          placeholder='username'
          value= {this.state.username}
          onChange= {this.handler}
          type= 'text'
          />
          <br />
          <input
          name= 'password'
          placeholder='password'
          value= {this.state.password}
          onChange= {this.handler}
          type= 'password'
          />
          <br />
          <button type='submit'>Sign in</button>
          <button type='button' onClick={this.register}>register</button>
        </form>
      </div>
    );
  }
}

export default Signin;
