import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/'

class Login extends Component {
    handleFormSubmit({ email, password }) {
        this.props.loginUser({ email, password });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <h1>Error!</h1> {this.props.errorMessage}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, fields: { email, password } } = this.props;
        return (
            <form onsubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset>
                    <label>Email</label>
                    <input {...email} />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <input {...password} />
                </fieldset>
                {this.renderAlert()}
                <button action="submit">Login</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'login',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Login);