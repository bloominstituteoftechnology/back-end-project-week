import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setId } from '../Redux/actions/index';

export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!sessionStorage.getItem('id')) this.props.history.push('/login');
      else this.props.setId(sessionStorage.getItem('id'));
    }

    render() {
      return (
        <div>
          {sessionStorage.getItem('id') && (
            <ComposedComponent {...this.props} />
          )}
        </div>
      );
    }
  }

  return connect(null, { setId })(RequireAuthentication);
};
