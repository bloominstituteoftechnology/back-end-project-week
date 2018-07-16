import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

export default class Signup extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password:"",
            confirmPassword:"",
            newUser: null,
        };
    }

validateForm() {
    retun (
        this.state.email.length > 0 &&
        this.state.password.length > 0 && 
        this.state.password === this.state.confirmPassword
    );
} 

handleChange = event => {
    this.setState({
        [event.target.id]: event.target.value
    });
}

handleSubmit = async event => {
    event.preventDefualt();

    this.setState({isLoading: true});
    this.setState({newUser: "test"});
    this.setState({isLoading:false});
}

handleConfirmationSubmit = async event => {
event.preventDefault();

this.setState({isLoading: true})
}

renderConfirmationForm(){
    return(
        <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
        <ControlLabel>Confirmation Code</ControlLabel>
        <FormControl
        autoFocus
        type="tel"
        value={this.state.confirmationCode}
        onChange={this.handleChange}
        />
        <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
        block 
        bsSixe="large"
        disables={!this.validateConfirmationForm()}
        type="submit"
        isLoading={this.state.isLoading}
        text="Verify"
        loadingText="Verifying..."
        />
        </form>
    );
}

renderForm() {
    return (
        <form onSubmit={this.handleSubmit}>
        <FormGroup conrtolId="email" bsSize="large">
        <ControlLabel>Email</ControlLabel>
        <FormControl
        autoFocus
        type="email"
        value={this.state.email}
        onChange={this.handleChange}
        />
        </FormGroup>
        </form>
    )
}

}
