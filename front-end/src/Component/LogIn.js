import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loggedIn} from '../Actions';
import Navigation from './Navigation';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            newAccount: false
        }
    }

    loginChangeHandler = event => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    loginAuth = event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        if (username.length > 5 && password.length > 5) {
            return this.props.loggedIn();
        }
        return alert('Both the Username and Password must be at least 5 characters long');
    }

    signUpToggle = event => {
        event.preventDefault();
        const active = this.state.newAccount;
        this.setState({newAccount: !active});

    }

    render() {
        return (
            <div className='HomePage'>
                <Navigation />
                <div className='Login'>
                <form style={this.state.newAccount ? {display: 'none'} : null}>
                    <div>Sign In</div>
                    <input type='text' placeholder='username' value ={this.state.username} onChange={this.loginChangeHandler} name='username' required />
                    <br/>
                    <br/>
                    <input type='text' placeholder='password' value ={this.state.password} onChange={this.loginChangeHandler} name='password' required />
                    <br/>
                    <br/>
                    <button onClick={this.loginAuth}>Login</button>
                    <br/>
                    <br/>
                    <br/>
                    <p>Need an account? <a href='' onClick={this.signUpToggle}>Sign Up</a></p>
                </form>
                <form style={this.state.newAccount ? null : {display: 'none'}}>
                    <div>Sign Up</div>
                    <input type='text' placeholder='username' value ={this.state.username} onChange={this.loginChangeHandler} name='username' required />
                    <br/>
                    <br/>
                    <input type='text' placeholder='password' value ={this.state.password} onChange={this.loginChangeHandler} name='password' required />
                    <br/>
                    <br/>
                    <button onClick={this.loginAuth}>Sign Up</button>
                    <br/>
                    <br/>
                    <br/>
                    <p>Want to Sign In? <a href='' onClick={this.signUpToggle}>LogIn</a></p>
                </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn
    }
}

export default connect(mapStateToProps, {loggedIn}) (LogIn);