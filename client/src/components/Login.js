import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Button} from 'reactstrap';

class Login extends Component{
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
        .post('http://localhost:5001/api/login', {email, password})
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
                <Button color='success' onClick={this.register}>Submit</Button>
                {" "}
                <Link to="/"><Button color='primary'>Home</Button></Link>
               </form>
            </div>
        )
    }    
}

export default Login;