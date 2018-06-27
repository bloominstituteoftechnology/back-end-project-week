import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    register = event => {
        event.preventDefault();
        const {email, password} = this.state
    
        axios
        .post('', {email, password})
        .then((response) => {
            this.setState({login: response.data, email:'', password:''})
        })
        .catch(err => {
            console.log('error', err)
        })
    }
    
    handleInput = e => {
        this.setState({[e.target.name]: e.target.value})
    }    
    
    render() {
        return (
            <div>
                <form>
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
                 <button onSubimt={this.register}>Submit</button>
                 {" "}
                 <Link to="/"><button>Home</button></Link>
                </form>
            </div>
        )
    }    
}

export default Register;