import React, { Component } from 'react';
import Login from './Login';

class LoginPage extends Component {
    render() {
        return (
            <div>
                <header>
                    <h1>Welcome!</h1>
                    <div>
                        <h1>Log in</h1>
                        <Login />
                    </div>
                </header>
            </div>
        )
    }
}