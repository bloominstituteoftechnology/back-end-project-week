import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userCreate, clearError } from '../Redux/actions/index';
import { Modal } from './Modal';
import LeftBar from '../LeftBar/LeftBar';
import './userCreate.css';
import './modal.css';

class UserCreate extends Component {
  state = {
    errorMessage: false,
    message: undefined,
  };

  handleFormSubmit = ({ username, password, confirmPassword }) => {
    this.props.userCreate(
      username,
      password,
      confirmPassword,
      this.props.history
    );
  };

  turnOffError = () => {
    this.setState({ errorMessage: false, message: undefined });
  };

  handleError = () => {
    if (this.props.message) {
      this.setState({ errorMessage: true, message: this.props.message });
      this.props.clearError();
    }
  };

  renderAlert = () => {
    return (
      this.state.errorMessage && (
        <Modal message={this.state.message} turnOffError={this.turnOffError} />
      )
    );
  };

  render() {
    const { handleSubmit } = this.props;
    this.handleError();
    return (
      <div className="container">
        {this.renderAlert()}
        <LeftBar />
        <div className="login-content">
          <div className="login-fields">
            <div className="login-title">Login</div>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <fieldset>
                <label />
                <Field
                  className="field"
                  placeholder="Username"
                  name="username"
                  component="input"
                  type="text"
                />
              </fieldset>
              <fieldset>
                <label />
                <Field
                  className="field"
                  placeholder="Password"
                  name="password"
                  component="input"
                  type="password"
                />
              </fieldset>
              <fieldset>
                <label />
                <Field
                  className="field"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  component="input"
                  type="password"
                />
              </fieldset>
              <button className="submit-button" action="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.auth.message,
  };
};

UserCreate = connect(mapStateToProps, { userCreate, clearError })(UserCreate);

export default reduxForm({
  form: 'userCreate', // Unique name for the form
  fields: ['username', 'password', 'confirmPassword'],
})(UserCreate);
