import React, { Component } from 'react';
import axios from "axios";
import {ClipLoader} from "react-spinners"
import "./Login.css"


class Login extends Component {
    constructor() {
        super();

        this.state = {
            Email: "",
            Password: "",
            loading: false,
        }
    }

    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value});
        return e.target.value;
      }

      handleFormSubmit = (e) => {
        localStorage.removeItem('node_id')
        localStorage.removeItem("token")
        this.setState({
            loading: true
        })
        e.preventDefault();

        const user = {
            email: this.state.Email,
            password: this.state.Password
        }

        axios.post("https://noteslambda.herokuapp.com/users/login", user)
        .then(response => {
            const token = response.data.token
            localStorage.setItem("token", token)
            this.props.history.push('/home')
        }).catch(err => {
            alert("Email and password are incorrect")
            window.location.reload(true)
            
        })
    }

    sendToRegister = () => {
        this.props.history.push('/')
    }


    render() {
        return(
            <div>
                <div className="loading">
                    <div className="loginBody">
                        <form className="loginCard" onSubmit={this.handleFormSubmit}>
                            <h1>Sign in</h1>
                            <div className="inputs">
                                Email: <input onChange={this.handleInputChange} name="Email" type="text"></input>
                                Password: <input onChange={this.handleInputChange} name="Password" type="password"></input>
                            </div>
                            <button style={login}>Login</button>
                            <button onClick={this.sendToRegister} style={login}>Register</button>
                            <div className="sweet-loading">
                                <ClipLoader
                                color={"#666"}
                                size={40}
                                loading={this.state.loading}
                                />
                            </div>
                        </form>
                        <a style={git} href="https://github.com/login/oauth/authorize?client_id=7e0997d4f79135cba0f9" className="github">Login With GitHub</a>
                    </div>
                </div>
            </div>
        )
    }
}

const login = {
    textDecoration: "none",
    backgroundColor: "rgb(110, 200, 200)",
    border: "none",
    width: "30%",
    paddingTop: "1%",
    height: "5vh",
    cursor: "pointer"
}

const git = {
    textDecoration: "none",
    backgroundColor: "rgb(120, 120, 120)",
    border: "none",
    width: "30%",
    paddingTop: "1%",
    height: "5vh",
    cursor: "pointer",
    // position: "relative",
    // top: 5
}

// const displayNone = {
//     display: "none"
// }

// const display = {
//     display: "block"
// }

export default Login;