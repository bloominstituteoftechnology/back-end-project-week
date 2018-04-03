import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signUp } from '../actions/signUpandIn';

class SignUp extends Component {
  handleFormSubmit({ email, password, confirmPassword }) {
    this.props.signUp(email, password, confirmPassword, this.props.history);
  }

  errorAlert = () => {
    if (!this.props.error) return null;
    return <h4>{this.props.error}</h4>;
  };

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
        <fieldset>
          <label>Confirm Password:</label>
          <Field name="confirmPass" component="input" type="password" />
        </fieldset>
        <button action="submit">Sign Up</button>
        {this.errorAlert()}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
  };
};

SignUp = connect(mapStateToProps, { signUp })(SignUp);

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'confirmPassword'],
})(SignUp);
