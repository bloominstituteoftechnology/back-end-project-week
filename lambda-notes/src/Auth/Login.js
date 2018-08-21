import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import axios from 'axios'

class Login extends Component {
  constructor () {
    super()
    this.state = {
      hasRegistered: true,
      wrongCredentials: false
    }
  }

  renderField = (field) => {
    const { touched, error } = field.meta
    const className = `form-group ${touched && error ? 'has-danger' : ''}`
    return (
      <div className={className}>
        <input
          className='form-control'
          type={field.type}
          placeholder={field.placeholder}
          {...field.input}
        />
        <div className='text-help' style={{ color: 'red' }}>
          {touched ? error : ''}
        </div>
      </div>
    )
  }
  handleLogin = (values, cb) => {
    axios
      .post('http://localhost:8000/auth/login', values)
      .then((res) => {
        localStorage.setItem('token', JSON.stringify(res.data.token))
        cb()
      })
      .catch((err) => {
        console.log(err)
        this.setState({ wrongCredentials: true })
      })
  }
  handleRegister = (values, cb) => {
    console.log('METHOD')
    axios
      .post('http://localhost:8000/auth/register', values)
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.data.token))
        cb()
      })
      .catch((err) => console.log(err))
  }
  onSubmit = (values) => {
    if (this.state.hasRegistered === false) {
      this.handleRegister(values, () => {
        this.props.history.push('/')
      })
    } else {
      this.handleLogin(values, () => {
        this.props.history.push('/')
      })
    }
  }
  handleSwitch = () => {
    this.setState((prevState) => ({
      hasRegistered: !prevState.hasRegistered
    }))
  }
  render () {
    const { handleSubmit } = this.props

    return (
      <div>
        <HandleFormDisplay hasRegistered={this.state.hasRegistered} />
        <label
          className='credentials-msg'
          style={
            this.state.wrongCredentials ? (
              { display: 'block' }
            ) : (
              { display: 'none' }
            )
          }
        >
          Invalid Credentials, please try again or Sign up!
        </label>
        <form
          className='needs-validation'
          onSubmit={
            this.state.hasRegistered ? (
              handleSubmit(this.onSubmit)
            ) : (
              handleSubmit(this.onSubmit)
            )
          }
        >
          <Field
            name='username'
            placeholder='username'
            type='text'
            component={this.renderField}
          />
          <Field
            name='password'
            type='password'
            placeholder='password'
            component={this.renderField}
          />
          <button type='submit'>
            {this.state.hasRegistered ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div onClick={this.handleSwitch}>
          {this.state.hasRegistered ? 'Or SignUp!' : 'Back to login'}
        </div>
      </div>
    )
  }
}
const HandleFormDisplay = (props) => {
  if (props.hasRegistered === true) {
    return <div>Login Form</div>
  } else {
    return <div>Register Form</div>
  }
}

function validate (values) {
  const errors = {}
  if (!values.username) {
    errors.username = 'Must Enter your username or Register'
  }
  if (!values.password) {
    errors.password = 'Must Enter a Password'
  }
  return errors
}

export default reduxForm({
  validate,
  form: 'loginForm'
})(Login)
