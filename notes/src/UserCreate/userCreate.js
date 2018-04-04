import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userCreate } from '../Redux/actions/index';
import LeftBar from '../LeftBar/LeftBar';
import './userCreate.css';

class UserCreate extends Component {
  handleFormSubmit = ({ username, password, confirmPassword }) => {
    this.props.userCreate(
      username,
      password,
      confirmPassword,
      this.props.history
    );
  };

  renderAlert = () => {
    if (this.props.message) return <h3>{this.props.message}</h3>;
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <LeftBar />
        <div className="login-content">
          <div className="login-fields">
            <div className="login-title">Login</div>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <fieldset>
                <label />
                <Field
                  className="field"
                  placeholder="Username"
                  name="username"
                  component="input"
                  type="text"
                />
              </fieldset>
              <fieldset>
                <label />
                <Field
                  className="field"
                  placeholder="Password"
                  name="password"
                  component="input"
                  type="password"
                />
              </fieldset>
              <fieldset>
                <label />
                <Field
                  className="field"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  component="input"
                  type="password"
                />
              </fieldset>
              <button className="submit-button" action="submit">
                Submit
              </button>
              {this.renderAlert()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.auth.message,
  };
};

UserCreate = connect(mapStateToProps, { userCreate })(UserCreate);

export default reduxForm({
  form: 'userCreate', // Unique name for the form
  fields: ['username', 'password', 'confirmPassword'],
})(UserCreate);
