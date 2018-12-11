import React, { Component } from 'react';
// import GoogleLogin from 'react-google-login';
// import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const initialUser = {
    username: '',
    password: ''
}

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                ...initialUser
            },
            message: '',
        }
    }
    

    inputHandler = (e) => {
        const {name,value} = e.target;
        this.setState({ user: {...this.state.user, [name]: value}})
    }

    submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', this.state.user)
        .then(res => {
            if (res.data){
                localStorage.setItem('secret_token', res.data.token)
                this.setState({
                    message: 'login successful',
                    user: {...initialUser},
                })
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            this.setState({
                message: 'authentication failed',
                user: {
                    ...initialUser
                }
            })
        });
    }

render(){
    return (
        <div className = "card-content">
        <h1>Welcome to Lambda Notes!</h1>
        <h2>Log In to view your old notes, or create a new one.</h2>

        <form onSubmit={this.submitHandler}>

            <input
            className="username-input"
            onChange={this.inputHandler}
            type="text"
            placeholder="username"
            value={this.state.username}
            name="username" />

        
            <textarea className="text-input"
           onChange={this.inputHandler}
           type="text"
           placeholder="password"
           value={this.state.password}
           name="password" />

            <button onClick={this.submitHandler} type="submit" className="button">Log In</button>
            </form>

        </div>
    )
    }
}
