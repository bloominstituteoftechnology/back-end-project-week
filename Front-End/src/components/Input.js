import React from 'react';
import Button from './Button'
import { Form } from 'semantic-ui-react'

class InputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            race: '',
            password: ''
        };
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    logIn = () => {
        return (
            <Form inverted>
                <h4>Please provide Username and Password</h4>
                <Form.Field required>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" onChange={this.handleChange} value={this.state.username} />
                </Form.Field>
                <Form.Field required>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name="password" onChange={this.handleChange} value={this.state.password} />
                </Form.Field>
                <Button text="Login" function={() => this.props.login({ username: this.state.username, password: this.state.password })} />
            </Form>
        )
    }
    signUp = () => {
        return (
            <Form inverted>
                <Form.Field required>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" onChange={this.handleChange} value={this.state.username} />
                </Form.Field>
                <Form.Field required>
                    <label htmlFor="password">Password</label>
                    <input type="text" id="password" name="password" onChange={this.handleChange} value={this.state.password} />
                </Form.Field>
                <Button text="Register" function={() => this.props.register({ username: this.state.username, password: this.state.password })} />
            </Form>
        );
    }
    render() {
        return (
            <div>
                {this.props.page === "register" ? this.signUp() : this.logIn()}
            </div>
        );
    }
}


export default InputComponent;