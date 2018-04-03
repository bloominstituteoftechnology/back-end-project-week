import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userLogin } from '../Redux/actions/index';
import './userLogin.css';

class UserLogin extends Component {

  handleFormSubmit = ({ username, password }) => {
      this.props.userLogin(username, password, this.props.history);
  };

  renderAlert = () => {
    if (this.props.message) return <h3>{this.props.message}</h3>;
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <div>Login</div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <fieldset>
            <label>Username:</label>
            <Field name="username" component="input" type="text" />
          </fieldset>
          <fieldset>
            <label>Password:</label>
            <Field name="password" component="input" type="password" />
          </fieldset>
          <button action="submit">Submit</button>
          {this.renderAlert()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.auth.message,
  };
};

UserLogin = connect(mapStateToProps, { userLogin })(UserLogin);

export default reduxForm({
  form: 'userLogin', // Unique name for the form
  fields: ['username', 'password'],
})(UserLogin);