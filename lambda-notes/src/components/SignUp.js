import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
  }

  save = (e) => {
    e.preventDefault();
    const newUser = Object.assign({}, this.state);
    this.props.register(newUser, this.props.history);
    this.setState({
      username: '',
      password: '',
    });
  };

  updateState = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="formBody">
        <div className="formHeader">Register:</div>
        <div className="formFields">
          <form type="submit">
            <div className="registerContainer">
              <input
                type="text"
                className="usernameField"
                value={this.state.username}
                name="username"
                onChange={this.updateState}
              />
            </div>
            <div className="passwordContainer">
              <textarea
                type="text"
                className="passwordField"
                value={this.state.password}
                name="password"
                onChange={this.updateState}
              />
            </div>
            <input
              type="submit"
              className="submitButton"
              value="Register"
              onClick={this.save}
            />
          </form>
        </div>
      </div>
    );
  };

};

  const mapStateToProps = state => {
    return {
      state: state, 
    };
  };
  
  export default connect(mapStateToProps, { register })(SignUp);
