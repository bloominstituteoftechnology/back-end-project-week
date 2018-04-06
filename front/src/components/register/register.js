import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    handleUsername = (event) => {
        this.setState({username: event.target.value});
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value});
    }

    handleSubmit = () => {
        axios.post("http://localhost:3001/api/newUser", {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {console.log(response)})
        .catch(err => console.log(err));
    }

    render(){
        return(
            <div className="login">
                <div className="login__header">
                    <p className="login__header__text">Create a Username and Password Below:</p>
                </div>

                <div className="login__input">
                    <form className="login__form">
                        <input className="login__form__username" value={this.state.username} onChange={this.handleUsername} />
                        <input className="login__form__password" value={this.state.password} onChange={this.handlePassword} />
                        <a href="/" className="login__form__save">
                            <div className="login__form__button">
                                <p className="login__form__button__text" onClick={this.handleSubmit}>Login</p>
                            </div>
                        </a>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register;