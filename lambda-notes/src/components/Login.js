import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  save = (e) => {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.login(user, this.props.history);
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
        <div className="formHeader">Login:</div>
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
              value="Login"
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
      authenticated: state.authenticated
    };
  };
  
  export default connect(mapStateToProps, { login })(Login);
