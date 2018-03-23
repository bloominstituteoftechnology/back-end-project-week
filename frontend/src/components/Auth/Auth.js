import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser, login } from '../../store/actions/actions';
import './Auth.css';

class Auth extends Component {
  state = {
    authenticated: false,
    username: '',
    password: '',
    attempted: false
  };

  componentDidMount() {
    this.props.login();
  }

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  checkAuthorization = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
    this.setState({
      username: '',
      password: '',
      attempted: true
    });
  };

  render() {
    if (this.props.authenticated) {
      return <Redirect to="/notes" />;
    }
    return (
      <div>
        <h1>Auth component</h1>
        <form onSubmit={this.checkAuthorization}>
          <div>
            <input
              onChange={this.inputChangeHandler}
              placeholder="user name"
              value={this.state.username}
              name="username"
            />
          </div>
          <div>
            <input
              onChange={this.inputChangeHandler}
              placeholder="password"
              value={this.state.password}
              name="password"
              type="password"
            />
          </div>
          <div className={this.state.attempted ? null : 'hidden'}>
            <h4 className="hidden--text">
              Oh no! something isn't right, or create a new user with that
              Username and Password
            </h4>
          </div>
          <button>Log In</button>
        </form>
        <button
          onClick={() =>
            this.props.addUser(this.state.username, this.state.password)
          }
        >
          Create New user
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.reducer.authenticated
  };
};

export default connect(mapStateToProps, { addUser, login })(Auth);
