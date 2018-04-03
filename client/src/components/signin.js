import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { login } from '../actions/signUpandIn';

class SignIn extends Component {
  handleFormSubmit({ email, password, history }) {
    login(email, password, history);
  }

  errorAlert() {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset>
          <label>Email:</label>
          <Field name="email" component="input" type="email" />
        </fieldset>
        <fieldset>
          <label>Password:</label>
          <Field name="password" component="input" type="password" />
        </fieldset>
        <button action="submit">Sign In</button>
        {this.errorAlert()}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated,
  };
};

SignIn = connect(mapStateToProps, { login })(SignIn);

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
})(SignIn);
