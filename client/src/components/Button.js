import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


export default class Buttons extends Component{
    render(){
        return (
            <div>
               <Link to="/register"><button>Register</button></Link>
                {" "}
                <Link to="/login"><button>Login</button></Link>
            </div>
        )
    }
};