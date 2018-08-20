import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <div className='welcome'>
            <h1>EASY NOTES</h1>
            <h4>Please login or register</h4>
            <Link to='/login'><button id='login' type="button">Login</button></Link>
            <Link to='/signup'><button type="button">Register</button></Link>
        </div>
    )
}