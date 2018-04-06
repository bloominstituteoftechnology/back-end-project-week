import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { login } from '../../actions';
import { connect } from 'react-redux';

class LogIn extends Component {
    handleFormSubmit({ username, password }) {
      this.props.login(username, password, this.props.history);
    }
  
    renderAlert() {
      if (!this.props.error) return null;
      return <h3>{this.props.error}</h3>;
    }
  
    render() {
      const { handleSubmit } = this.props;
  
      return (
        <form autoComplete="off" className="login__form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="login__container">
            <label className="login__label">Username:</label>
            <Field className="login__field" name="username" component="input" type="text" />
          </fieldset>
          <fieldset className="login__container">
            <label className="login__label">Password:</label>
            <Field className="login__field" name="password" component="input" type="password" />
          </fieldset>
          <button className="login__button" action="submit">Sign In</button>
          {this.renderAlert()}
        </form>
      );
    }
  }
  
  const mapStateToProps = state => {
    return {
      error: state.auth.error,
      authenticated: state.auth.authenticated
    };
  };
  
  LogIn = connect(mapStateToProps, { login })(LogIn);
  
  export default reduxForm({
    form: 'signin',
    fields: ['username', 'password']
  })(LogIn);
