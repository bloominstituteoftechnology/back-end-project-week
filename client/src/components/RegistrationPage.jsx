import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';

class RegistrationPage extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  render() {
    return (
      <div className="RegistrationView">
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
          <input
            type="text"
            placeholder="Confirm password"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordChange}
          />
          <button className="Form__submit" type="submit">Sign Up</button>
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

  handleConfirmPasswordChange = (event) => {
    this.setState({ confirmPassword: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.password === this.confirmPassword) {
      await this.props.register(this.state.email, this.state.password);
      this.setState({password: ''});
      this.setState({confirmPassword: ''})
      this.props.history.push('/login')
    } else console.log('PWs do not match');
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.state,
  }
}

export default connect(mapStateToProps, { register })(RegistrationPage);