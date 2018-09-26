import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';




class Registration extends Component {
    
    
    state = {
        username: '',
        password: '',
    }


    render() {
    return (
        <form onSubmit={this.register} className="regForm">
        <div className="regOverlay">
            <div className="greeting">Welcome!</div>
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
                    // value={this.state.password} 
                    onChange={this.handleChange} 
                    type="submit" 
                    >Register</button>
                
            </div>
            <Link to="/login" className="alt">login</Link>
            </div>
        </form>
    );
    }

    handleChange = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value })
    }


    register = event => {
        event.preventDefault();   
        
        if(this.state.username === '' || this.state.password === ''){
            return;
        }

        axios
            .post('http://localhost:5000/register', this.state)
            .then(res => {
                localStorage.removeItem('jwt');
                console.log(res.data);
                // if(this.state.username != '' || this.state.password != ''){
                localStorage.setItem('jwt', res.data.token);
            //};
                 if (localStorage !== 'jwt'){
                this.props.history.push('/')
            }
            })
            .catch(err => {
                console.log(err, 'err')
                this.props.history.push('/register')
    });

    };
 

}




export default Registration;