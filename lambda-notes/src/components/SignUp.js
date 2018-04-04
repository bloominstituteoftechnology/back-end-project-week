import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';
import '../styles/RegisterLogin.css';

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
      <div className="formContainer">
        <div className="formWrapper">
          <div className="formField">
            <div className="formText">Sign Up</div>
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
                  value="Register"
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
      state: state, 
    };
  };
  
  export default connect(mapStateToProps, { register })(SignUp);
