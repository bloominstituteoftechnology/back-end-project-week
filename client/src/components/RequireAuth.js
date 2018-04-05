import React, { Component } from 'react';
import { connect } from 'react-redux';
//import NoteList from './noteList';

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
            <ComposedComponent notes={this.props.notes} />
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
