import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { login } from '../actions';
import { connect } from 'react-redux';

class SignIn extends Component {
  handleFormSubmit({ username, password }) {
    this.props.login(username.toLowerCase(), password, this.props.history);
  }

  renderAlert() {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signin">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset>
            <Field placeholder="username" name="username" component="input" type="text" />
          </fieldset>
          <fieldset>
            <Field placeholder="password" name="password" component="input" type="password" />
          </fieldset>
          <button action="submit">Sign In</button>
          {this.renderAlert()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated
  };
};

SignIn = connect(mapStateToProps, { login })(SignIn);

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password']
})(SignIn);