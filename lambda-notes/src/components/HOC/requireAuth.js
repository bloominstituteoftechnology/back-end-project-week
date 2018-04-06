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
      return (
        <div>
        {!this.props.authenticated ? 
        <div className="auth">
          <div className="auth--title">Welcome To NoteTater</div>
          <div className="auth--subtitle">you must sign in to use the app</div> 
          </div> :
           <ComposedComponent />}
        </div>
      )
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated
    };
  };
  return connect(mapStateToProps)(RequireAuthentication);
};