import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";

let divStyle = {
  width: "80%"
};

class Register extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  };
  signupSubmitHandler = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/signup", this.state)
      .then(response => {
        console.log("response", response.data);
        localStorage.setItem("authToken", response.data.token);
        this.props.history.push(`${this.state.username}/displayNotes`);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  signupInputHandler = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <Container>
        <div className="d-flex justify-content-center mt-5 mb-4">
          <h3>Sign up to take awesome notes!</h3>
        </div>
        <Form onSubmit={this.signupSubmitHandler.bind(this)}>
          <div className="d-flex ">
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                className="d-flex w-100 p-2"
                required
                type="firstName"
                name="firstName"
                value={this.state.firstName}
                onChange={this.signupInputHandler}
                placeholder="Enter your first name"
              />
            </FormGroup>
            <FormGroup>
              <Label className="ml-3" for="lastName">
                Last Name
              </Label>
              <Input
                className="d-flex w-100 ml-3 p-2"
                required
                type="lastName"
                name="lastName"
                value={this.state.lastName}
                onChange={this.signupInputHandler}
                placeholder="Enter your last name"
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <Label for="username">User Name</Label>
              <Input
                className=" p-2"
                style={divStyle}
                required
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.signupInputHandler}
                placeholder="Enter your user name"
              />
            </FormGroup>
          </div>
          <div className="d-flex">
            <FormGroup>
              <Label for="Password">Password</Label>
              <Input
                className="d-flex w-100 p-2"
                required
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.signupInputHandler}
                placeholder="Enter your password"
              />
            </FormGroup>
            <FormGroup>
              <Label className="ml-3" for="ConfirmPassword">
                Confirm Password
              </Label>
              <Input
                className="d-flex w-100 ml-3 p-2"
                required
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.signupInputHandler}
                placeholder="Confirm your password"
              />
            </FormGroup>
          </div>

          <Button>Sign Up</Button>
        </Form>
      </Container>
    );
  }
}

export default Register;
