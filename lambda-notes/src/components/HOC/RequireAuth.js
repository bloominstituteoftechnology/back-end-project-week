import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ListView from '../ListView';

export default function RequireAuth(ComposedComponent) {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!localStorage.getItem('authorization')) {
        this.props.history.push('/');
      }
    }

    render() {
      const token = localStorage.getItem('authorization');
      if (token) {
        return (
          <ComposedComponent />
        )
      }
      return null;
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};