import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { register } from '../actions';

class SignUp extends Component {
  handleFormSubmit = ({ username, password, confirmPassword }) => {
    this.props.register(username, password, confirmPassword, this.props.history);
  }
  renderAlert = () => {
    if(!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signup">
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset>
          <Field placeholder="username" name="username" component="input" type="text" />
        </fieldset>
        <fieldset>
          <Field placeholder="password" name="password" component="input" type="password" />
        </fieldset>
        <fieldset>
          <Field placeholder="confirm password" name="confirmPassword" component="input" type="password" />
        </fieldset>
        <button action="submit">Sign Up</button>
        {this.renderAlert()}
      </form>
      </div>
    );
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
