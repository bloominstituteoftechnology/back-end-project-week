import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions';
import UserSidebar from '../UserSidebar/UserSidebar';
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
      <div className="Container">
        <div className="Sidebar-Container">
          <UserSidebar />
        </div>
        <div className="SignUp">
          <header>
            <h2>Register Here!</h2>
          </header>
          <div className="Input-form">
            <form onSubmit={this.onSubmit}>
              <input name="username" value={this.state.username} onChange={this.onChange} type="text" placeholder="username" />
              <input name="password" value={this.state.password} onChange={this.onChange} type="password" placeholder="password" />
              <button type="submit">Sign Up</button>
              {this.renderAlert()}
            </form>
          </div>
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
