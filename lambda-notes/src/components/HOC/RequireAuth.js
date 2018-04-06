import React from 'react';
import { connect } from 'react-redux';
import { authUser } from '../../actions';

export default WrappedComponent => {
  class RequireAuthentication extends React.Component {
    componentWillMount() {
      if (localStorage.getItem('token')) {
        this.props.authUser();
      }
      if (!this.props.authenticated || this.props.authenticated === null) this.props.history.push('/pleaselogin');
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
  return connect(mapStateToProps, { authUser })(RequireAuthentication);
}