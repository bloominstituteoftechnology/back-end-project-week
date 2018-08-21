import React from 'react';
import { loginUser } from './../../actions';
import { connect } from 'react-redux';
import {Button} from './../../styles/styles';
import Styled from 'styled-components';


const LoginContainer = Styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
`;

const InputField = Styled.input`
    width: 190px;
`;


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }


handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
    console.log(this.state)
}

handleSubmit = event => {
    event.preventDefault();
    const user = this.state;
    this.props.loginUser(user);
    console.log(this.state)
    
}

    render() {
        return (
            <div>
                <LoginContainer onSubmit={this.loginUser}>
                    <InputField
                        type='text'
                        name='username'
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <InputField
                        type='password'
                        name='password'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <Button>Log in</Button>
                </LoginContainer>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      users: state.users
    }
  }
  
  const mapActionsToProps = {
    loginUser: loginUser,
  }
  export default connect( mapStateToProps, mapActionsToProps)(Login);