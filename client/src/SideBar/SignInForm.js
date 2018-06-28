import React, { Component } from 'react';
import injectSheet from 'react-jss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const styles = theme => ({
    primaryButton: theme.button.primary,
    thirdButton: theme.button.third,
    inputField: theme.formInput,
    regularSignIn: {
        backgroundColor: 'white'
    },
})

class SignUpForm extends Component {
    state = {
        username: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSignIn = () => {
        const payload = JSON.stringify(this.state)
        fetch('/api/user/login', {
            method: 'post',
            body: payload,
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        const { username, token } = data
                        sessionStorage.setItem('jwtToken', token);
                        this.props.handleCompleteSignIn({ username })
                    })
                } else {
                    this.setState({ username: '', password: '' })
                    sessionStorage.removeItem('jwtToken');
                    //todo: show err message to user
                    console.log('Username and Password are invalid')
                }
            })
            .catch(err => {
                this.setState({ username: '', password: '' })
                sessionStorage.removeItem('jwtToken');
                //todo: show err message to user
                console.log(err)
            })
    }
    render() {
        const { classes } = this.props
        const { username, password } = this.state
        return (
            <div>
                <input
                    className={classes.inputField}
                    type='text'
                    name='username'
                    value={username}
                    placeholder='Username'
                    onChange={this.handleChange} />
                <input
                    className={classes.inputField}
                    type='password'
                    name='password'
                    value={password}
                    placeholder='Password'
                    onChange={this.handleChange} />
                <div
                    className={[classes.thirdButton, classes.regularSignIn].join(' ')}
                    onClick={this.handleSignIn}>
                    <FontAwesomeIcon icon='sign-in-alt' />
                </div>
            </div>
        )
    }
}

export default injectSheet(styles)(SignUpForm);