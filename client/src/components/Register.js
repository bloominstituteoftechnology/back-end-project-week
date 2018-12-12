import React, {Component} from 'react';
import axios from 'axios';

const initialUser = {
    username: '',
    password: ''
}

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {
                ...initialUser
            },
            message: ''
        }
    }

    inputHandler = (e) => {
        const {name,value} = e.target;
        this.setState({ user: {...this.state.user, [name]: value}})
    }

    submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', this.state.user)
        .then(res => {
            if (res.status === 200){
                localStorage.setItem('secret_token', res.data.token)
                this.setState({
                    message: 'registration successful',
                    user: {...initialUser},
                })
            } else {
                throw new Error();
            }
        })
        .catch(err => {
            this.setState({
                message: 'registration failed',
                user: {
                    ...initialUser
                },
            })
        });
    }

render(){
    return(
        <div>
            <form onSubmit={this.submitHandler}>
            
            <label htmlFor="username">Username</label>
            <input
            type="text"
            id="username"
            name="username"
            value={this.state.user.username}
            onChange={this.inputHandler}/>

            <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            name="password"
            value={this.state.user.password}
            onChange={this.inputHandler}/>

            <button type='submit'>Register</button>

            </form>
        </div>
    )
}


}