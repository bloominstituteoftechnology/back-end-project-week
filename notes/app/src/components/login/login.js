import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { reduxForm, Field } from 'redux-form';

import { login, resetErrors } from '../../actions';

import Header from '../app/header';

class Login extends Component {
  componentWillMount() {
    this.props.resetErrors();
  }

  submitFormHandler = ({ username, password }) => {
    this.props.login(username, password, this.props.history);
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
              ? 'Logging in..'
              : this.props.error === '' ? 'Log in' : this.props.error}
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

            <button className="SignupForm__button" action="submit">
              Log in
            </button>

            <NavLink className="SignupForm__NavLink" to="/signup">
              Sign up
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

Login = connect(mapStateToProps, { login, resetErrors })(Login);

export default reduxForm({
  form: 'login',
  fields: ['username', 'password'],
})(Login);
