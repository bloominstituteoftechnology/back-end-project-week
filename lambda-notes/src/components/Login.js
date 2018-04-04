import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import '../styles/RegisterLogin.css';

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
      <div className="formContainer">
        <div className="formWrapper">
          <div className="formField">
            <div className="formText">Login</div>
              <form type="submit">
                <div className="inputContainer">
                  <input
                    type="text"
                    className="usernameField"
                    value={this.state.username}
                    name="username"
                    onChange={this.updateState}
                  />
                </div>
                <div className="inputContainer">
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
