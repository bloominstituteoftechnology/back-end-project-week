import React from 'react';
import { connect } from 'react-redux';

export default ComposedComponent => {
  class RequireAuth extends React.Component {
    componentWillMount() {
      if (!sessionStorage.getItem('username')) {
        this.props.history.push('/login');
      }
    }

    render() {
      return (
        <div>
          {sessionStorage.getItem('username') ? (
            <ComposedComponent {...this.props} />
          ): null}
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
