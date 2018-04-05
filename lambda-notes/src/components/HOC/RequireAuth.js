import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListView from '../ListView';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!this.props.userAuthenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <div>
          {this.props.userAuthenticated ? <ListView /> : <div />}
        </div>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      userAuthenticated: state.userAuthenticated
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};