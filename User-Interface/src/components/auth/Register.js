import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

class Register extends Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    signin = e =>{
        e.preventDefault()

        axios
            .post('http://localhost:5000/api/register', this.state)
            .then(res => {
                localStorage.setItem('jwt', res.data.token);
                this.props.history.push('/note')
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className="form-wrap">
                <h2>Please Register</h2>
                <form onSubmit = {this.signin}>
                    <div className="form">
                        <label>Username</label>
                        <input name = 'username' value = {this.state.username} onChange = {this.handleChange} type="text"></input>
                    </div>
                    <div className="form">
                        <label>Password</label>
                        <input name = 'password' value = {this.state.password} onChange = {this.handleChange} type="password"></input>
                    </div>
                    <div className="form-btn">
                        <button type = "submit">Register</button>
                        <Link to = '/'><button>Back</button></Link>
                    </div>
                </form>
            </div>
            
            );
    }
}

export default Register;