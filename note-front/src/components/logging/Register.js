import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { register } from "../../actions";
import "../../styles/Login.css";

class Register extends Component {
  handleFormSubmit({ username, email, password, confirm }) {
    this.props.register(username, email, password, confirm, this.props.history);
  }

  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signup__form">
        <form
          className="signup__form"
          onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
        >
          <div className="signup__form_field_container">
            <fieldset className="signup__container">
              <label className="signup__label">Username:</label>
              <Field
                className="signup__field"
                name="username"
                component="input"
                type="text"
              />
            </fieldset>
            <fieldset className="signup__container">
              <label className="signup__label">Email:</label>
              <Field
                className="signup__field"
                name="email"
                component="input"
                type="text"
              />
            </fieldset>
          </div>
          <div className="signup__form_field_container">
            <fieldset className="signup__container">
              <label className="signup__label">Password:</label>
              <Field
                className="signup__field"
                name="password"
                component="input"
                type="password"
              />
            </fieldset>
            <fieldset className="signup__container">
              <label className="signup__label">Confirm Password:</label>
              <Field
                className="signup__field"
                name="confirm"
                component="input"
                type="password"
              />
            </fieldset>
          </div>
          <button className="signup__button" action="submit">
            Confirm
          </button>
          {this.renderAlert()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

Register = connect(mapStateToProps, { register })(Register);

export default reduxForm({
  form: "signup",
  fields: ["username", "password", "confirm"]
})(Register);
