import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './NavBar.css'

const NavBar = () =>{
    return(
        <div className = 'nav-container'>
            <h1 className = 'nav-header'>LAMBDA NOTES</h1>
            <div className = 'nav-button-container'>
                <div className = 'module-border-wrap'>
                    <NavLink className = 'nav-link' exact to = '/'>
                        <div className = 'module-button'>
                            <h4 className = 'nav-button-text first'>NOTES</h4>
                        </div>
                    </NavLink>       
                </div>
                <div className = 'module-border-wrap'>
                    <NavLink className = 'nav-link' exact to = '/create'>
                        <div className = 'module-button'>
                            <h4 className = 'nav-button-text'>CREATE NOTE</h4>
                        </div>
                    </NavLink>    
                </div>
            </div>
        </div>
    )
}

export default NavBar