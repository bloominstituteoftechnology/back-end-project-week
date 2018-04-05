import React, {Component} from 'react';
import styled from 'styled-components';
import {FormGroup, FormControl, Row, Col, Grid} from 'react-bootstrap';
import {signUpUser, extendTokenLife} from '../actions'
import {connect} from 'react-redux';

class SignUp extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    };

    updateField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    addNewUser = () => {
        this.props.signUpUser(this.state);
    };

    extendTokenLife = (e) => {
        e.preventDefault();
        console.log('extendTokenLife', e.target);
        this.props.extendTokenLife();
    };

    render() {
        return (
            <SignUpContainer>
                <Grid>
                    <Row className="show-grid">
                    {this.props.userName === ''
                        ?
                        <Col md={6} className={"col-up"}>
                            <h3 className={'top-title'}>SignUp:</h3>
                        </Col>
                        :
                        <Col md={8} className={"col-up"}>
                            <h3 className={'top-title'}>Welcome {this.props.userName}</h3>
                        </Col>
                    }

                    </Row>

                    <Row>
                        <Grid>
                            <Row className="show-grid">
                                <Col md={12} className={"col-up"}>
                                    {this.props.userName === ''
                                        ?
                                        <form>
                                            <FormGroup>
                                                <FormControl
                                                    type="text"
                                                    value={this.state.name}
                                                    placeholder="Name"
                                                    onChange={this.updateField}
                                                    name={"name"}
                                                />
                                                <br/>
                                                <FormControl
                                                    type="email"
                                                    value={this.state.email}
                                                    placeholder="Email"
                                                    onChange={this.updateField}
                                                    name={"email"}
                                                />
                                                <br/>
                                                <FormControl
                                                    type="password"
                                                    value={this.state.password}
                                                    placeholder="Password"
                                                    onChange={this.updateField}
                                                    name={"password"}
                                                />
                                                <div className={"form-btn"}>

                                                    <div onClick={() => {
                                                        this.addNewUser()
                                                    }} className={'btn-side create-new'}>
                                                        <div className={"btn-text"}> Sign Up</div>
                                                    </div>

                                                </div>
                                            </FormGroup>
                                        </form>
                                        :
                                        <div className={"form-btn"}>
                                            <form>
                                                <FormGroup >
                                                    <button onClick={this.extendTokenLife} className={"btn, btn-primary btn-lg"}> Continue SignIn </button>
                                                </FormGroup>
                                            </form>
                                        </div>
                                    }
                                </Col>
                            </Row>
                        </Grid>
                    </Row>

                </Grid>
            </SignUpContainer>
        )}
}

const mapStateToProps = state => {
    const {users_reducer} = state;
    return {
        userName: users_reducer.userName,
        user: users_reducer.user,
        token: users_reducer.token,
    }
};

export default connect(mapStateToProps, {signUpUser, extendTokenLife})(SignUp);

const SignUpContainer = styled.div`
    text-align:left;
    margin-top:10px;
    border: 0px solid black;
    
    .form-btn {
        text-align:center;
    }
    
    input{
        border-radius: 0px;
        width:55%
    }
    
    textarea{
        border-radius: 0px;
        height:300px;
    }

        .title-form {
            text-align:center;
            padding:0px;
        }
        
        .btn-update{
            text-align:center;
            margin-top:15px;
        }
        
        .create-new{
            width:35%
        }

`;