import React from 'react';
import axios from 'axios';
import './welcomepage.css';

class WelcomePage extends React.Component {
  state = {
    name: '',
    password: '',
    confirmpassword: '',
    welcomeSwitchValue: 'buttons',
    message: ''
  }

  render() {
    return (
      <div>
        <div className="welcomePage__welcome">Welcome to Lambda Notes</div>
        <div> {this.welcomeSwitch(this.state.welcomeSwitchValue)} </div>
        <div> {this.state.message} </div>
      </div>
    );
  }

  welcomeSwitch = (param) => {
    switch(param) {
      case 'login':
        return <div>
          <form onSubmit={this.loginUser}>
            <input name="name" type="text" placeholder="Name" onChange={this.handleChange} value={this.state.name}/>
            <input name="password" type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
            <button type="submit">Submit</button>
            <button onClick={this.cancel}>Cancel</button>
          </form>
        </div>;
      case 'register':
        return <div>
          <form onSubmit={this.registerUser}>
            <input name="name" type="text" placeholder="Name" onChange={this.handleChange} value={this.state.name}/>
            <input name="password" type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
            <input name="confirmpassword" type="password" placeholder="Confirm Password" onChange={this.handleChange} value={this.state.confirmpassword}/>
            <button type="submit">Submit</button>
            <button onClick={this.cancel}>Cancel</button>
          </form>
        </div>;
      case 'buttons':
        return <div>
          <button onClick={() => this.changeWelcomeSwitch('login')}>Login</button>
          <button onClick={() => this.changeWelcomeSwitch('register')}>Register</button>
        </div>;
      default:
        return null;
    }
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  };

  changeWelcomeSwitch = (value) => {
    this.setState({ ...this.state, welcomeSwitchValue: value });
  };

  loginUser = (event) => {
    const name = this.state.name;
    const password = this.state.password
    event.preventDefault();
    axios
    .post('http://localhost:3030/api/login', { name, password })
    .then(res => {
      this.changeMessage(res.data.message);
      localStorage.setItem('token', res.data.token);
      this.cancel();
    })
    .catch(err => {
      console.error(err);
      console.error(err.response.data.message);
      this.changeMessage(err.response.data.message);
    });
  };

  registerUser = (event) => {
    const name = this.state.name;
    const password = this.state.password
    event.preventDefault();
    if (this.state.confirmpassword !== password) {
      this.changeMessage('Passwords do not match');
      return;
    }
    axios
      .post('http://localhost:3030/api/users', { name, password })
      .then(res => {
        this.changeMessage(res.data.message);
        this.cancel();
      })
      .catch(err => {
        console.error(err);
        console.error(err.response.data.err);
        this.changeMessage(err.response.data.message);
      });
  };

  changeMessage = (text) => {
    this.setState({ message: text });
  };

  cancel = (event) => {
    if (event) {
      event.preventDefault();
      this.setState({ message: '' });
    }
    this.setState({
      name: '',
      password: '',
      confirmpassword: '',
      welcomeSwitchValue: 'buttons'
    });
  };
}

export default WelcomePage;
