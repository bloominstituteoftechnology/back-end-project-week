import React from 'react';
import '../styles/App.css';
import { Route, Link } from 'react-router-dom';

function Home(props) {
    return(
        <div className='container'>
        <h2 className="text-center">Welcome!</h2>
        <p> <strong>To my React application!</strong></p>
        <ol>
        <li><Link to={`/Register`}>Registration</Link></li>
        <li><Link to={`/Login`}>Log In</Link></li>
        </ol>
        </div>
    )
}
export default Home;