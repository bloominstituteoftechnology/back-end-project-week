import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    headerClickedHandler = _ => {
    };

    render() {
        return (
            <NavLink to= '/' className='Header' onClick={this.headerClickedHandler}>
            </NavLink>
        );
    }
}

export default Header;

