import React from "react";
import axios from "axios";
import "../App.css";

export default class Login extends React.Component {
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
            .post("https://lambda-backend-project-2886.herokuapp.com/api/users/login", user)

            .then(response => {
                this.props.history.push("/users");
                if (response.data.username) {
                    this.setState({ response: "Logged In" });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ response: "Login Error" });
            });
    };

    render = () => {
        return (
            <div className="loginForm">
                <form onSubmit={this.handleSubmit}>
                    <input name="username" onChange={this.handleChange} />
                    <input name="password" type="password" onChange={this.handleChange} />
                    <button type="submit">Login</button>
                </form>
                <p>{this.state.response}</p>
            </div>
        );
    };
}
