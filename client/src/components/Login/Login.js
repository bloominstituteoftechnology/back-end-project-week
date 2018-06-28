import React, { Component } from 'react';
import { getNotes } from '../../actions';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            invalid: ''
        }
    }

    submitHandler = (event) => {
        event.preventDefault();

        axios.post('http://localhost:1433/api/auth/login', { username: this.state.username, password: this.state.password })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem('jwt', response.data.token);
                    this.props.getNotes(response.data.id);
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                if (error.response.status === 401) {
                    this.setState({ invalid: error.response.data });
                }
                else {
                    alert(`Error: ${error.response.status} ${error.response.data}`);
                }
            })
    };

    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, invalid: '' });
    };

    render() {
        return (
            <div className='login'>
                <form onSubmit={this.submitHandler}>
                    <div><input style={this.state.invalid ? { borderBottom: '1.5px solid red' } : { borderBottom: '1.5px solid #979797' }} name='username' type='text' placeholder='Username' value={this.state.username} onChange={this.handleOnChange} required /></div>
                    {this.state.invalid ? <div className='invalid'>{this.state.invalid}</div> : null}
                    <div className='secondDiv'><input style={this.state.invalid ? { borderBottom: '1.5px solid red' } : { borderBottom: '1.5px solid #979797' }} name='password' type='password' minLength='4' placeholder='Password' value={this.state.password} onChange={this.handleOnChange} required /></div>
                    {this.state.invalid ? <div className='invalid'>{this.state.invalid}</div> : null}
                    <div className='thirdDiv'><button type='submit'>Log In</button></div>
                </form>
            </div>
        )
    }
}

export default withRouter(connect(null, { getNotes })(Login)); 