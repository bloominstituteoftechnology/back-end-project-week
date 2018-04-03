import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/signin');
      }
    }

    render() {
      return !this.props.authenticated ? null : <ComposedComponent />
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated
    };
  };
  return connect(mapStateToProps)(RequireAuthentication);
};