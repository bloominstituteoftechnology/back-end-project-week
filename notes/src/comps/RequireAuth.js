import React from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class RequireAuth extends React.Component {
    componentWillMount() {
      if (!this.props.authed) {
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <div>
          {this.props.authed ? (
            <ComposedComponent />
          ) : this.props.history.push('/login')}
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      authed: state.authed,
    };
  };

  return connect(mapStateToProps)(RequireAuth);
};
