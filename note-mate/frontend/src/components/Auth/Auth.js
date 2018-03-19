import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../../store/actions/actions';
import './Auth.css';

class Auth extends Component {
  render() {
    if (this.props.state.authenticated) {
      return <Redirect to="/notes" />;
    }
    return (
      <div>
        <h1>Auth component</h1>
        <form onSubmit={this.props.checkAuthorization}>
          <div>
            <input
              onChange={this.props.inputChangeHandler}
              placeholder="user name"
              value={this.props.state.username}
              name="username"
            />
          </div>
          <div>
            <input
              onChange={this.props.inputChangeHandler}
              placeholder="password"
              value={this.props.state.password}
              name="password"
              type="password"
            />
          </div>
          <div className={this.props.state.attempted ? null : 'hidden'}>
            <h4 className="hidden--text">
              Oh no! something isn't right, or create a new user with that
              Username and Password
            </h4>
          </div>
          <button>Log In</button>
        </form>
        <button
          onClick={() =>
            this.props.addUser(
              this.props.state.username,
              this.props.state.password
            )
          }
        >
          Create New user
        </button>
      </div>
    );
  }
}

export default connect(null, { addUser })(Auth);
