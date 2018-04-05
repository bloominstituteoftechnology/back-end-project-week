import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions';
import { Link } from 'react-router-dom';
import './SignUp.css';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  onSubmit = (event) => {
    event.preventDefault();
    this.props.register(this.state.username, this.state.password, this.props.history);
  }

  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    return (
        <div>
          <div className="Register-container">
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
            Register Here!
          </div>
        </div>
        <div className="Input-form">
          <form onSubmit={this.onSubmit}>
            <input name="username" value={this.state.username} onChange={this.onChange} type="text" placeholder="username" />
            <input name="password" value={this.state.password} onChange={this.onChange} type="password" placeholder="password" />
            <button type="submit">Sign Up</button>
            {this.renderAlert()}
          </form>
          </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};

SignUp = connect(mapStateToProps, { register })(SignUp);

export default SignUp;
