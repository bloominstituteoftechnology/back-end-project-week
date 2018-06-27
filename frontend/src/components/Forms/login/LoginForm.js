import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { sendToken } from '../../Actions';
import { Button, Form, Input } from 'semantic-ui-react';
import { domain } from '../../../config/dev';
import { saveToken } from '../../../config/localStorage';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.reset = {
      email: "",
      password: "",
    };
    this.state = {
      email: "",
      password: "",
      redirect: false
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  inputSpitter = (name, type="text", handler=this.handleInputChange) => {
    return <Input 
      type={type} 
      name={name} 
      value= {this.state[name]} 
      onChange={handler}
    />;
  }

  submitAndRegister = (loginObject) => {
    axios.post(`${domain}/register`,loginObject)
      .then(res => {
        console.log(res.data.token);
        this.props.sendToken(res.data.token);
        this.setState({ ...this.reset });
        this.props.history.push('/notes');
      })
      .catch(err => {
        console.log("submitAndRegister ERROR:",err);
        alert('Registration unsuccessful. Please try again.')
      });
  }

  submitAndLogin = (loginObject) => {
    axios.post(`${domain}/login`,loginObject)
      .then(res => {
        console.log("submitAndLogin `this`:",this);
        const token = res.data.token;
        saveToken(token);
        this.props.sendToken(token);
        this.setState({ ...this.reset });
        this.props.history.push('/notes');
      })
      .catch(err => {
        console.log("submitAndLogin ERROR:",err);
        alert('Login unsuccessful. Please try again.')
      });
  }

  formSubmit = (e) => {
    e.preventDefault();
    
    const loginObject = { 
      email: this.state.email, 
      password: this.state.password
     };

     if (this.props.match.path === '/register') {
       this.submitAndRegister(loginObject);
     } else {
       this.submitAndLogin(loginObject);
     }
  }

  render() {

    return (
      <Form onSubmit={this.formSubmit} className="">
        <Form.Field>
          <label>E-mail</label>
          {this.inputSpitter('email')}
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          {this.inputSpitter('password', 'password')}
        </Form.Field>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default connect(null, { sendToken  })(LoginForm);
