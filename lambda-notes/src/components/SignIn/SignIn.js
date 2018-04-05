import React, { Component } from 'react';
import { login } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './SignIn.css';
class SignIn extends Component {
  state = {
    username: '',
    password: ''
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password, this.props.history);
  }
  renderAlert() {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  }

  render() {
    return (
      <div>
        <div className="HomePage-container">
          <nav className="Sidebar-container">
            <div className="Sidebar">
              <h1>Lambda Notes</h1>
              <div className="Sidebar-buttons">
              <Link to="/login">
                <button className="Sidebar-button" >
                  Login
                </button>
              </Link>
              <Link to="/users">
                <button className="Sidebar-button">
                    Register
                </button>
              </Link>
              </div>
            </div>
          </nav>
          <div className="HomePage-Text">
            Log In Here!
          </div>
        </div>
        <div className="Input-form">
          <form onSubmit={this.onSubmit}>
            <input name="username" onChange={this.onChange} value={this.state.username} type="text" placeholder="username" />
            <input name="password" onChange={this.onChange} value={this.state.password} type="password" placeholder="password" />
            <button type="submit">Sign In</button>
            {this.renderAlert()}
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated
  };
};

SignIn = connect(mapStateToProps, { login })(SignIn);

export default SignIn;
