import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideBar from './sideBar';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentDidMount() {
      if (!this.props.authenticated) {
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <div>
          {this.props.authenticated ? (
            <ComposedComponent>
              <SideBar />
            </ComposedComponent>
          ) : null}
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated,
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};
