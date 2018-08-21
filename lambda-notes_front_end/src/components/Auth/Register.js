import React from 'react';
import { createUser } from './../../actions';
import { connect } from 'react-redux';
import {Button} from './../../styles/styles';
import Styled from 'styled-components';

const RegisterContainer = Styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputField = Styled.input`
    width: 190px;
`;




class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = event => {
        const user = this.state;
        this.props.createUser(user);

    }

    render() {
        return (
            <div>
                <RegisterContainer>
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
                    <Button>Register</Button>
                </RegisterContainer>
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
    createUser: createUser,
  }
  export default connect( mapStateToProps, mapActionsToProps)(Register);