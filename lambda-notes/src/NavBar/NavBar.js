import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavBar.css'

const NavBar = () =>{
    return(
        <div className = 'nav-container'>
            <h1 className = 'nav-header'>LAMBDA NOTES</h1>
            <div className = 'nav-button-container'>
                
                    <NavLink className = 'nav-link' exact to = '/'>
                        <h4 className = 'nav-button-text first'>NOTES</h4>
                    </NavLink>       
                
               
                    <NavLink className = 'nav-link' exact to = '/create'>
                       
                            <h4 className = 'nav-button-text'>CREATE               NOTE</h4>
                        
                    </NavLink>    
                
            </div>
        </div>
    )
}

export default NavBar