import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import { register, resetErrors } from '../../actions';

import Header from '../app/header';

class Signup extends Component {
  componentWillMount() {
    this.props.resetErrors();
  }

  submitFormHandler = ({ username, password, confirmPassword }) => {
    this.props.register(
      username,
      password,
      confirmPassword,
      this.props.history,
    );
  };

  render() {
    return (
      <div className="Signup">
        <Header />

        <form
          className="Signup__form"
          onSubmit={this.props.handleSubmit(this.submitFormHandler)}
        >
          {/* <div className="Signup__form"> */}
          <div className="SignupDescription">
            {this.props.authenticating
              ? 'Signing up..'
              : this.props.error === ''
                ? 'Sign up for an account'
                : this.props.error}
          </div>

          <div className="SignupForm">
            <fieldset>
              <Field
                className="InputFields"
                name="username"
                component="input"
                type="text"
                placeholder="username"
              />
            </fieldset>

            <fieldset>
              <Field
                className="InputFields"
                name="password"
                component="input"
                type="password"
                placeholder="password"
              />
            </fieldset>
            <fieldset>
              <Field
                className="InputFields"
                name="confirmPassword"
                component="input"
                type="password"
                placeholder="confirm password"
              />
            </fieldset>

            <button className="SignupForm__button" action="submit">
              Sign up
            </button>

            <NavLink className="SignupForm__NavLink" to="/login">
              Have an account? Log in
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticating: state.auth.authenticating,
    error: state.auth.error,
  };
};

Signup = connect(mapStateToProps, { register, resetErrors })(Signup);

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password', 'confirmPassword'],
})(Signup);
