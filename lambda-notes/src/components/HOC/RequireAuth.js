import React, { Component } from 'react';
import { connect } from 'react-redux';
import ViewNotes from '../ViewNotes';


export default ComposedComponent => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) this.props.history.push('/login');
    }

    render() {
      if (!this.props.authenticated) {
        return <div />;
      } else {
        return (
          <div>
            <ViewNotes />
          </div>
        );
      }
    }
  }

  const mapStateToProps = state => {
    return {
      authenticated: state.authenticated
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};
