import React, { Component } from 'react';
import injectSheet from 'react-jss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const styles = theme => ({
    primaryButton: theme.button.primary,
    inputField: theme.formInput
})

class SignUpForm extends Component {
    state = {
        username: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSignUp = () => {
        const payload = JSON.stringify(this.state)
        fetch('/api/user', {
            method: 'post',
            body: payload,
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                this.setState({ username: '', password: '' })
                this.props.handleSignIn()
            })
            .catch(err => {
                this.setState({ username: '', password: '' })
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
                <div className={classes.primaryButton} onClick={this.handleSignUp}>
                    <FontAwesomeIcon icon='user-plus' />
                </div>
            </div>
        )
    }
}

export default injectSheet(styles)(SignUpForm);