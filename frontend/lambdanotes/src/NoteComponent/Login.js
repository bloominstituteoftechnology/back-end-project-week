import React from 'react';
import '../styles/App.css';
import { Route, Link } from 'react-router-dom';

function Login(props) {
    return(
        <div className='container'>
        <h2 className="text-center">Hey there!</h2>
        <p> <strong>Log in to your account!</strong></p>
        <div>
        <input type="text" value={props.username} onChange={props.changeHandler}/>
        <input type="text" value={props.password} onChange={props.changeHandler}/>
        <button onClick={props.checkValidation}>Log in</button>
        </div>
        </div>
    )
}
export default Login;

