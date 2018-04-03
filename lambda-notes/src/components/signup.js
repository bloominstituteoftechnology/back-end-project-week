import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { register } from '../actions';

class SignUp extends Comment {
  handleFormSubmit = ({ username, password, confirmPassword }) => {
    this.props.register(username, password, confirmPassword, this.props.history);
  }
  renderAlert = () => {
    if(!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    <div className="signup">
    <h3>Sign Up</h3>
    <form onSubmit={handleSubmit(this.handleFormSubmit)}>
      <fieldset>
        <label>Username:</label>
        <Field placeholder="username" name="username" component="input" type="text" />
      </fieldset>
      <fieldset>
        <label>Password:</label>
        <Field placeholder="password" name="password" component="input" type="password" />
      </fieldset>
      <fieldset>
        <label>Confirm Password:</label>
        <Field placeholder="confirm password" name="confirmPassword" component="input" type="password" />
      </fieldset>
      <button action="submit">Sign Up</button>
      {this.renderAlert()}
    </form>
    </div>
  }
};

  const mapStateToProps = state => {
    return {
      error: state.auth.error
    };
  };

  SignUp = connect(mapStateToProps, { register })(SignUp);

  export default reduxForm({
    form: 'signup',
    fields: ['username', 'password', 'confirmPassword']
  })(SignUp);
