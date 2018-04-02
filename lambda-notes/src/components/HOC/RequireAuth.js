import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListView from '../ListView';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <div>
          {this.props.authenticated ? <ListView /> : <div />}
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      authenticated: state.auth.authenticated
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};