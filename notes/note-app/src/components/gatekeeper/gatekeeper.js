import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appK } from '../../config';

export default ComposedComponent => {
  class CheckAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated && !localStorage.getItem(appK)) {
        window.alert('Please log in first');
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <div className="CheckAuthentication">
          {this.props.authenticated || localStorage.getItem(appK) ? (
            <ComposedComponent history={this.props.history} />
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

  return connect(mapStateToProps)(CheckAuthentication);
};
