import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loggedIn, signUp } from '../Actions';
import Navi from './navi';
import {
    Jumbotron,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            newAccount: false
        };
    }

    loginChangeHandler = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    loginAuth = event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        if (password.length > 0 && username.length > 0) {
            return this.props.loggedIn(username, password);
        }
        return alert('Must include both a password and username');
    };

    signUpAuth = event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        const confirmPassword = this.state.confirmPassword;

        if (confirmPassword === password && username.length > 0) {
            return this.props.signUp(username, password);
        }
        return alert(
            'Make sure to include a username and a matching password.'
        );
    };

    signUpToggle = event => {
        event.preventDefault();
        const active = this.state.newAccount;
        this.setState({ newAccount: !active });
    };

    render() {
        return (
            <div className="HomePage">
                <Navi />
                <Jumbotron>
                    <Alert color="primary">Welcome to Lambda Notes!</Alert>
                    <Form
                        style={
                            this.state.newAccount ? { display: 'none' } : null
                        }
                    >
                        <FormGroup>
                            <Label hidden>Sign In</Label>

                            {this.props.error ? (
                                <h3 className="LogInError">
                                    Incorrect username/password
                                </h3>
                            ) : null}

                            <Input
                                type="text"
                                placeholder="username"
                                value={this.state.username}
                                onChange={this.loginChangeHandler}
                                name="username"
                                required
                            />

                            <Input
                                type="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.loginChangeHandler}
                                name="password"
                                required
                            />

                            <Button color="primary" onClick={this.loginAuth}>
                                Login
                            </Button>

                            <Alert color="warning">
                                Need an account?{' '}
                                <a href="" onClick={this.signUpToggle}>
                                    Sign Up
                                </a>
                            </Alert>
                        </FormGroup>
                    </Form>
                    <Form
                        style={
                            this.state.newAccount ? null : { display: 'none' }
                        }
                    >
                        <FormGroup>
                            <Label>Sign Up</Label>
                            <Input
                                type="text"
                                placeholder="username"
                                value={this.state.username}
                                onChange={this.loginChangeHandler}
                                name="username"
                                required
                            />

                            <Input
                                type="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.loginChangeHandler}
                                name="password"
                                required
                            />

                            <Input
                                type="password"
                                placeholder="confirm password"
                                value={this.state.confirmPassword}
                                onChange={this.loginChangeHandler}
                                name="confirmPassword"
                                required
                            />

                            <Button color="success" onClick={this.signUpAuth}>
                                Sign Up
                            </Button>

                            <Alert color="warning">
                                Want to Sign In?{' '}
                                <a href="" onClick={this.signUpToggle}>
                                    LogIn
                                </a>
                            </Alert>
                        </FormGroup>
                    </Form>
                </Jumbotron>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        error: state.error,
        signedUp: state.signedUp
    };
};

export default connect(mapStateToProps, { loggedIn, signUp })(LogIn);
