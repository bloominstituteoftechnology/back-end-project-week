import React, { Component } from 'react';
import { connect } from 'react-redux';
// appKey ?

export default ComposedComponent => {
  class CheckAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        window.alert('Please log in first.');
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <div className="CheckAuthentication">
          {this.props.authenticated ? <ComposedComponent /> : null}
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated,
    };
  };

  return connect(mapStateToProps)(CheckAuthentication);
};
