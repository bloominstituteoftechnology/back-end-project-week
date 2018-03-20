import React, { Component } from 'react';
import './Navi.css';
class Navi extends Component {
    render() {
        return (
            <nav className="nav-header">
                <h2 className="nav-title" href="/">
                    Lambda Notes
                </h2>
                <form className="sign-form">
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Password" />
                    <button className="sign">Log In</button>
                    <button className="sign">Log Out</button>
                </form>
            </nav>
        );
    }
}

export default Navi;
