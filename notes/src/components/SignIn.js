import React, {Component} from 'react';
import styled from 'styled-components';
import {FormGroup, FormControl, Row, Col, Grid} from 'react-bootstrap';
import {signInUser} from '../actions';
import {connect} from 'react-redux';


class SignIn extends Component {
    state = {
        email: '',
        password: '',
    };

    updateField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    signInUser = () => {
        this.props.signInUser(this.state);
    };

    render() {
        return (
            <SignInContainer>
                {(this.props.userName !== '')
                    ?
                    <div>
                        {this.props.userName}
                    </div>
                    :
                    ''
                }
                <Grid>
                    <Row className="show-grid">
                        <Col md={6} className={"col-up"}>
                            <h3 className={'top-title'}>SignIn:</h3>
                        </Col>
                    </Row>

                    <Row>
                        <Grid>
                            <Row className="show-grid">
                                <Col md={12} className={"col-up"}>
                                    <form>
                                        <FormGroup>

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
                                            <div className={"btn-update"}>

                                                <div onClick={() => {this.signInUser()}} className={'btn-side create-new'}>
                                                    <div className={"btn-text"}> SignIn </div>
                                                </div>

                                            </div>
                                        </FormGroup>
                                    </form>
                                </Col>
                            </Row>
                        </Grid>
                    </Row>

                </Grid>
            </SignInContainer>
        )}
}

const mapStateToProps = state => {
    const {users_reducer} = state;
    return {
        userName: users_reducer.userName,
        user: users_reducer.user,
    }
};

export default connect(mapStateToProps, {signInUser})(SignIn);

const SignInContainer = styled.div`
    text-align:left;
    margin-top:10px;
    
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