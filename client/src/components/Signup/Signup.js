import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import './Signup.css';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirect: null,
            error: ''
        }
    }

    submitHandler = (event) => {
        event.preventDefault();

        axios.post('http://localhost:1433/api/auth/signup', { username: this.state.username, password: this.state.password })
            .then(response => {
                this.setState({ redirect: true });
            })
            .catch(error => {
                if (error.response.status === 400) {
                    this.setState({ error: error.response.data });
                }
                else {
                    alert(`Error: ${error.response.status} ${error.response.data}`)
                }
            })
    };

    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, error: '' });
    };

    render() {
        return (
            <div className='signup'>
                <form onSubmit={this.submitHandler}>
                    <div><input id='usernamePopOver' name='username' type='text' placeholder='Username' value={this.state.username} onChange={this.handleOnChange} required /></div>
                    {this.state.error ? <div className='error'>{this.state.error}</div> : null}
                    <div className='secondDiv'><input name='password' type='password' minLength='4' placeholder='Password' value={this.state.password} onChange={this.handleOnChange} required /></div>
                    <div className='thirdDiv'><button type='submit'>Sign Up</button></div>
                    {this.state.redirect ? <Redirect to='/login' /> : null}
                </form>
            </div>
        )
    }
}

export default withRouter(connect(null)(Signup)); 