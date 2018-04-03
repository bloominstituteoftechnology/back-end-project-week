import React from 'react';
import './welcomepage.css';

class WelcomePage extends React.Component {
  state = {
    name: '',
    password: '',
    confirmpassword: '',
    welcomeSwitchValue: 'buttons'
  }

  render() {
    return (
      <div>
        <div className="welcomePage__welcome">Welcome to Lambda Notes</div>
        <div> {this.welcomeSwitch(this.state.welcomeSwitchValue)} </div>
      </div>
    );
  }

  welcomeSwitch = (param) => {
    switch(param) {
      case 'login':
        return <div>
          <form>
            <input name="name" type="text" placeholder="Name" onChange={this.handleChange} value={this.state.name}/>
            <input name="password" type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
            <button>Submit</button>
            <button onClick={() => this.changeWelcomeSwitch('buttons')}>Cancel</button>
          </form>
        </div>;
      case 'register':
        return <div>
          <form>
            <input name="name" type="text" placeholder="Name" onChange={this.handleChange} value={this.state.name}/>
            <input name="password" type="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
            <input name="confirmpassword" type="password" placeholder="Confirm Password" onChange={this.handleChange} value={this.state.confirmpassword}/>
            <button>Submit</button>
            <button onClick={() => this.changeWelcomeSwitch('buttons')}>Cancel</button>
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
}

export default WelcomePage;
