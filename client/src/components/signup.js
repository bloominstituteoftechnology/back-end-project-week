import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { signUp } from '../actions';

class SignUp extends Component {
  handleFormSubmit = ({ username, password, confirmPassword }) => {
    this.props.signUp(username, password, confirmPassword, this.props.history);
  };
  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signup">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <fieldset>
            <label>Email: </label>
            <Field
              placeholder="email"
              name="email"
              component="input"
              type="email"
            />
          </fieldset>
          <fieldset>
            <label>Password: </label>
            <Field
              placeholder="password"
              name="password"
              component="input"
              type="password"
            />
          </fieldset>
          <fieldset>
            <label>Confirm Password: </label>
            <Field
              placeholder="Confirm password"
              name="confirmPassword"
              component="input"
              type="password"
            />
          </fieldset>
          <button action="submit">Sign Up</button>
          {this.renderAlert()}
        </form>
      </div>
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
