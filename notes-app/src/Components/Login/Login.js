import React, { Component } from 'react';
import '../Registration/index.css';
import axios from 'axios';
import { Link } from 'react-router-dom';




class Login extends Component {
    
    
    state = {
        username: '',
        password: ''
    }


    render() {
    return (
        <form onSubmit={this.login} className="regForm">
        
        <div className="regOverlay">
        <div className="greeting">Welcome back!</div>
            <br /><br />
            <div>
                
                <input
                name= "username" 
                value={this.state.username} 
                onChange={this.handleChange} 
                type ="text"
                placeholder="Username"
                />
            </div>
            <div>
                
                <input 
                name="password" 
                value={this.state.password}
                onChange={this.handleChange}
                type ="password"
                placeholder="Password"
                />
            </div>
            <div>
                    <button
                    className="regButton"
                    value={this.state.password} 
                    onChange={this.handleChange} type="submit">Submit</button>
            </div>
            <Link to="/register" className="alt">register</Link>
            </div>
            
        </form>
    );
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value })
    }


    login = event => { 
        event.preventDefault();  
        
        if(this.state.username === '' || this.state.password === ''){
            localStorage.removeItem('jwt');
            return;
        }
        
        
        axios
            .post('http://localhost:5000/login', this.state)
            .then(res => {
                console.log(res.data);
                // localStorage.removeItem('jwt');
                localStorage.setItem('jwt', res.data.token);
                // if (this.state.password != ''){
                this.props.history.push('/')
            //}
            })
            .catch(err => {
                console.log(err, 'err')
                this.props.history.push('/register')
    });

    };

    

}




export default Login;