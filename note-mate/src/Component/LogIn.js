import React, { Component } from 'react';
import {connect} from 'react-redux';
import {loggedIn} from '../Actions';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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

    render() {
        return (
            <form>
                <label>Username<br/></label>
                <input type='text' placeholder='username' value ={this.state.username} onChange={this.loginChangeHandler} name='username' required />
                <label>Password<br/></label>
                <input type='text' placeholder='password' value ={this.state.password} onChange={this.loginChangeHandler} name='password' required />
                <button onClick={this.loginAuth}>Submit</button>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        state
    }
}

export default connect(mapStateToProps, {loggedIn}) (LogIn);