import React, {Component} from 'react';
import styled from 'styled-components';
import {FormGroup, FormControl, Row, Col, Grid} from 'react-bootstrap';


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
    render() {
        return (
            <SignUpContainer>
                <Grid>
                    <Row className="show-grid">
                        <Col md={6} className={"col-up"}>
                            <h3 className={'top-title'}>SignUp:</h3>
                        </Col>
                    </Row>

                    <Row>
                        <Grid>
                            <Row className="show-grid">
                                <Col md={12} className={"col-up"}>
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
                                            <div className={"btn-update"}>

                                                <div onClick={() => {this.addNote()}} className={'btn-side create-new'}>
                                                    <div className={"btn-text"}> Sign Up </div>
                                                </div>

                                            </div>
                                        </FormGroup>
                                    </form>
                                </Col>
                            </Row>
                        </Grid>
                    </Row>

                </Grid>
            </SignUpContainer>
        )}
}

export default SignUp;

const SignUpContainer = styled.div`
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