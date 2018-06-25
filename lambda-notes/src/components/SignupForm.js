import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: false,
            errorMessage: ''
        };
    }

    createUser = event => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        axios.post("http://localhost:5000/users/register", user).then(response => {
            localStorage.setItem('token', response.data.token)
            this.props.history.push(`/login`)
            // window.location.href = "/"
            this.setState({
                error: false
            });
        })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: true,
                    errorMessage: err.response.data.error
                })
            })
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className="col-sm-9">
                <div className='signup-form-div'>
                    <h2>Sign Up </h2>
                    <div className={this.state.error ? "error" : "hidden"}>
                        {this.state.errorMessage}
                    </div>
                    <div className='signup-form'>
                        <div className="form-group">
                            <input className="form-control" placeholder="Username" name='username' type="text" value={this.state.username} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            {/* <img className='red-x' src="http://pluspng.com/img-png/red-x-png-image-35396-500.png" />f */}
                            <input className="form-control" placeholder="Password" name='password' type="password" value={this.state.password} onChange={this.handleInputChange} />
                        </div>
                        <div className='signup-buts'>
                            <button type="submit" className="signup-button" onClick={this.createUser}>
                                Submit
                            </button>
                            <Link to="/">
                                <button className="home-button">
                                    Home
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupForm;