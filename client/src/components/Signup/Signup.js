import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Signup.css';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            username: '',
            password: '',
            passwordMatch: '',
            emailError: null,
            usernameError: null,
            passwordError: null
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.password !== this.state.passwordMatch) {
            this.setState({ passwordError: 'Passwords do not match.' });
            return;
        }
        else {
            axios.post('http://localhost:1433/api/auth/signup', { firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email, username: this.state.username, password: this.state.password })
                .then(response => {
                    this.props.history.push('/login');
                })
                .catch(error => {
                    if (error.response.status) {
                        if (error.response.status === 400 && error.response.data[0] === 'email') {
                            this.setState({ emailError: error.response.data[1] });
                        }
                        else if (error.response.status === 400 && error.response.data[0] === 'username') {
                            this.setState({ usernameError: error.response.data[1] })
                        }
                    }
                    else {
                        console.log(`Error: ${error}`);
                    }
                })
        }
    };

    handleOnChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            this.setState({ [name]: value.replace(' ', '').toLowerCase(), emailError: null });
        }
        else if (name === 'username') {
            this.setState({ [name]: value.replace(' ', '').toLowerCase(), usernameError: null })
        }
        else if (name === 'password' || name === 'passwordMatch') {
            this.setState({ [name]: value, passwordError: null });
        }
        else {
            this.setState({ [name]: value.replace(' ', '') });
        }
    };

    render() {
        return (
            <div className='signup'>
                <form onSubmit={this.submitHandler}>
                    <div><input id='firstname' type='text' name='firstname' maxLength='20' placeholder='First Name' value={this.state.firstname} onChange={this.handleOnChange} required /></div>
                    <div><input id='lastname' type='text' name='lastname' maxLength='20' placeholder='Last Name' value={this.state.lastname} onChange={this.handleOnChange} required /></div>
                    <div><input name='email' type='email' placeholder='Email' value={this.state.email} onChange={this.handleOnChange} required />{this.state.emailError ? <div className='emailError'>{this.state.emailError}</div> : null}</div>
                    <div><input id='username' name='username' type='text' maxLength='20' placeholder='Username' value={this.state.username} onChange={this.handleOnChange} required />{this.state.usernameError ? <div className='usernameError'>{this.state.usernameError}</div> : null}</div>
                    <div><input name='password' type='password' minLength='4' placeholder='Password' value={this.state.password} onChange={this.handleOnChange} required />{this.state.passwordError ? <div className='passwordError'>{this.state.passwordError}</div> : null}</div>
                    <div><input name='passwordMatch' type='password' minLength='4' placeholder='Confirm Password' value={this.state.passwordMatch} onChange={this.handleOnChange} required />{this.state.passwordError ? <div className='passwordError'>{this.state.passwordError}</div> : null}</div>
                    <div className='submitButton'><button type='submit'>Sign Up</button></div>
                </form>
            </div>
        )
    }
};

export default withRouter(Signup); 