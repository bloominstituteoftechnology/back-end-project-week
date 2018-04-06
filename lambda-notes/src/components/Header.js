import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/RegisterLogin.css';

class Header extends Component {
  getLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/home" className="splashText">Enter</Link>
        </div>
      );
    }
    return (
      <div>
        <Link to="/login" className="splashText">Login</Link>
        <Link to="/signup" className="splashText">Sign Up</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="formContainer">
        <div className="formWrapper">
          <div className="splashField">
            {this.getLinks()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  };
};

export default connect(mapStateToProps)(Header);
