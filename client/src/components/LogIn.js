import React from 'react';
// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import { Link } from 'react-router-dom';

const LogIn = () => {


    return (
        <div className = "card-content">
        <h1>Welcome to Lambda Notes!</h1>
        <h2>Log In to view your old notes, or create a new one.</h2>

        <form onSubmit={this.loginHandler}>

            <input
            className="username-input"
            onChange={this.changeHandler}
            type="text"
            placeholder="username"
            value={this.state.username}
            name="username" />

        
            <textarea className="text-input"
           onChange={this.changeHandler}
           type="text"
           placeholder="password"
           value={this.state.password}
           name="password" />

            <button onClick={this.loginHandler} type="submit" className="button">Log In</button>
            </form>

        </div>
    )
}


export default LogIn;