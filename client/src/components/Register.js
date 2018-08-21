import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'reactstrap';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    handleInput = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    register = event => {
        event.preventDefault();
        const {email, password} = this.state
    axios
        .post('http://localhost:5001/api/user', { email ,password})
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        })
        .then((response) => {
            this.setState({
                login: response.data,
                email: '',
                password: ''
            })
        })
        .catch(err => {

            console.log('error', err)
        })
    }
    render() {
        return (
            <div>
                <form >
                <input 
                    onChange={this.handleInput}
                    placeholder="Email"
                    value={this.email}
                    name="email"
                />
                <input 
                    onChange={this.handleInput}
                    placeholder="Password"
                    value={this.password}
                    name="password"
                />
                 <Button color='success' onClick={this.register}>Submit</Button>
                 {" "}
                 <Link to="/"><Button color='primary'>Home</Button></Link>
                </form>
            </div>
        )
    }    
}

export default Register;