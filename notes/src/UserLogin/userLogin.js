import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { userLogin } from '../Redux/actions/index';
import LeftBar from '../LeftBar/LeftBar';
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
      <div className="container">
        <LeftBar />
        <div className="login-content">
          <div className="login-fields">
            <div className="login-title">Login</div>
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <fieldset>
                <label className="field-title">Username:</label>
                <Field
                  className="field"
                  name="username"
                  component="input"
                  type="text"
                />
              </fieldset>
              <fieldset>
                <label className="field-title">Password:</label>
                <Field
                  className="field"
                  name="password"
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

UserLogin = connect(mapStateToProps, { userLogin })(UserLogin);

export default reduxForm({
  form: 'userLogin', // Unique name for the form
  fields: ['username', 'password'],
})(UserLogin);
