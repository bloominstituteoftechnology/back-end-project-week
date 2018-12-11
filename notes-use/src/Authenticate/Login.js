import React from 'react';
import './login.css';
import axios from 'axios';
//import { Link } from 'react-router-dom';

class Login extends React.Component {
    
    constructor (props) {
        console.log(props);
        super(props);
        this.state = {
            userEmail : '',
            password : ''
        };
    }

    handleInputChange = event => {
        this.setState({ [event.target.name] : event.target.value });
    };

    handleLoginSubmit = (event) => {
        console.log("handleloginSubmit....")
        const user = {
            username : this.state.userEmail,
            password : this.state.password
        }
        axios.post('http://localhost:3300/api/login',user)
             .then(res => {
                 if(res.status === 200) {
                    this.props.status = true;
                    console.log(res);
                 }
              })
             .catch(error => {
                    console.log(error);
              })
    }

    render() {
        
        return (
            <div className = "Formdiv">
                <h1>Welcome to Lambda Notes</h1>
                <form>
                    <div className = "Fieldwrap">
                        <label>User-email : </label>
                        <input 
                            type = "email"
                            name = "userEmail"
                            value = {this.state.userEmail}
                            onChange = {this.handleInputChange}
                            placeholder = "Enter user email"

                        />
                    </div>
                    <div className = "Fieldwrap">
                        <label>Password : </label>
                        <input className = "pass" 
                            type = "password"
                            name = "password"
                            value = {this.state.password}
                            onChange = {this.handleInputChange}
                            placeholder = "Enter user password"
                        />
                    </div>                  
                    
                    <div className = "login-register" >
                        <button onClick = {this.handleLoginSubmit} > 
                            Login 
                        </button>

                        <button>Register </button>
                        
                    </div>
                               
                </form>
            </div>
        )
    }
}

export default Login;
