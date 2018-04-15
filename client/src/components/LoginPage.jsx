import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <div className="LoginView">
        <form className="Form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Email goes here"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <input
            type="text"
            placeholder="Password goes here"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <button className="Form__submit" type="submit">Log In</button>
        </form>
      </div>
    )
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.login(this.state.email, this.state.password);
    this.setState({password: ''});
    if (this.props.authed) {
      this.props.history.push('/');
    }
  }
}

const mapStateToProps = (state) => {
  return {
    authed: state.authed,
  }
}

export default connect(mapStateToProps, { login })(LoginPage);