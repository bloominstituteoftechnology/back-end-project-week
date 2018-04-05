import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.createUser = this.createUser.bind(this);
    }
    

    handleFirstName(event) {
       this.setState({ firstname: event.target.value });
    }

    handleLastName(event) {
        this.setState({ firstname: event.target.value });
    }

    handleUsername(event) {
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        this.setState({ password: event.target.value });
    }

    createUser(event) {
        event.preventDefault();
        const newUser = { first: this.state.firstname, last: this.state.lastname, user: this.state.username, pass: this.state.password };
        axios.post('http://localhost:5000/create-post', newUser)
            .then((data) => {
                localStorage.setItem('uuID', data.data._id);
                setTimeout(() => {
                    window.location = '/list'
                }, 200)
            })
            .catch(err => {
                console.log({ 'error': err.response.error });
            });
    }

    render() {
        return (
            <div className="main__registration">
                <div className="main__registration__header">
                    <h1>Welcome to Lambda Notes!</h1>
                    <hr className="style__one" />
                    <h3>A free platform for those who love taking notes. Sign up now.</h3>
                
                    <form>
                        <p className="p__shift">First Name:</p>
                        <input placeholder="Sara" type="text" name="firstname" onChange={this.handleFirstName} value={this.state.firstName} />

                        <p className="p__shift">Last Name:</p>
                        <input placeholder="Smith" type="text" name="lastname" onChange={this.handleLastName} value={this.state.lastName} />

                        <p className="p__shift">Username:</p>
                        <input placeholder="so2018" type="text" name="lastname" onChange={this.handleUsername} value={this.state.username} />

                        <p className="p__shift">Password:</p>
                        <input type="text" name="lastname" onChange={this.handlePassword} value={this.state.password} />
                        <br />

                        <button onClick={this.createUser} className="button__registration">Submit</button>
                        <Link to='/list'><button className="button__registration">Log In</button></Link>
                    </form>
                </div>
            </div>

        );
    }
}

export default Registration;