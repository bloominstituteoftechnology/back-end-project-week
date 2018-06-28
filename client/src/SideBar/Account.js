import React, { Component } from 'react';
import injectSheet from 'react-jss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

const styles = theme => ({
    primaryButton: theme.button.primary,
    thirdButton: theme.button.third,
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        textAlign: 'center'
    },
    regularSignIn: {
        backgroundColor: 'white'
    },
    facebookColor: {
        backgroundColor: '#3b5998'
    },
    googleColor: {
        backgroundColor: '#ea4335'
    },
    flexRow: {
        display: 'flex',
        justifyContent: 'space-around'
    }
})

class Account extends Component {
    state = {
        signInWithSupernoteAccount: false,
        completeSignedUp: false,
        completeSignedIn: false,
        username: '',
    }
    handleSignUp = () => {
        this.setState({
            signInWithSupernoteAccount: false,
            completeSignedUp: false
        })
    }
    handleSignIn = () => {
        this.setState({ completeSignedUp: true })
    }
    handleSignInWithSupernoteAccount = () => {
        this.setState({ signInWithSupernoteAccount: true })
    }
    handleCompleteSignIn = ({ username }) => {
        this.setState({ completeSignedIn: true, username })
        this.props.handleCompleteSignIn()
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <h3>Account</h3>
                {!this.state.completeSignedIn ?
                    <div className={classes.container}>
                        {(!this.state.completeSignedUp && !this.state.signInWithSupernoteAccount) ?
                            <div>
                                <p>Sign up new account</p>
                                <SignUpForm handleSignIn={this.handleSignIn} />
                            </div>
                            :
                            <div>
                                <p>Sign in </p>
                                <SignInForm handleCompleteSignIn={this.handleCompleteSignIn} />
                            </div>
                        }
                        {!this.state.signInWithSupernoteAccount ?
                            <div>
                                <p>OR</p>
                                <p>Sign in</p>
                                <div className={classes.flexRow}>
                                    <div
                                        className={[classes.thirdButton, classes.regularSignIn].join(' ')}
                                        onClick={this.handleSignInWithSupernoteAccount}>
                                        <FontAwesomeIcon icon='sign-in-alt' />
                                    </div>
                                    <div className={[classes.primaryButton, classes.facebookColor].join(' ')}>
                                        <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                                    </div>
                                    <div className={[classes.primaryButton, classes.googleColor].join(' ')}>
                                        <FontAwesomeIcon icon={['fab', 'google']} />
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                or back to <strong onClick={this.handleSignUp}>Sign Up</strong>
                            </div>
                        }
                    </div>
                    :
                    <div>Hello {this.state.username}!</div>
                }
            </div>
        )
    }
}

export default injectSheet(styles)(Account);