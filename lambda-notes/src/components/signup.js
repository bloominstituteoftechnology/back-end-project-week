import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { register } from '../actions';
import { NavLink } from 'react-router-dom';

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
      <div className="popup">
      <div className="popup__inner">
        <h3>Please sign up</h3>
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
        <NavLink to="/signin"> <button>Sign In</button> </NavLink>
        {this.renderAlert()}
      </form>
      </div>
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
