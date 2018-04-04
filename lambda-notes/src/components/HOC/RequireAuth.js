import React from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '../../actions';

export default WrappedComponent => {
  class RequireAuthentication extends React.Component {
    componentWillMount() {
      if (!this.props.authenticated) this.props.history.push('/pleaselogin');
    }
    render() {
      return (
        <div>
          {this.props.authenticated ? <WrappedComponent /> : <div>Not Logged In</div>}
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    return {
      authenticated: state.auth.authenticated
    };
  };
  return connect(mapStateToProps, { checkAuth })(RequireAuthentication);
}