import React from "react";
import axios from "axios";
import "../App.css";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            response: ""
        };
    }
        handleChange = event => {
            this.setState({ [event.target.name]: event.target.value });
        };
        handleSubmit = event => {
            event.preventDefault();
            const user = {
                username: this.state.username,
                password: this.state.password
            }
            axios
            .post("https://lambda-backend-project-2886.herokuapp.com/api/users/register", user)
                .then(response => {
                    console.log(response);
                    if (response.data.username) {
                        this.setState({ response: "Registered" });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({ response: "Register Error" });
                });
        };

        render = () => {
            return (
                <div className="loginForm">
                    <form onSubmit={this.handleSubmit}>
                        <input name="username" onChange={this.handleChange} />
                        <input name="password" type="password" onChange={this.handleChange} />
                        <button type="submit">Register</button>
                    </form>
                    <p>{this.state.response}</p>
                </div>
            );
        };
    }
