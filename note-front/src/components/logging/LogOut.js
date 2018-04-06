import React, { Component } from "react";
import { connect } from "react-redux";

import { logout } from "../../actions";

class LogOut extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <div>You have been logged out</div>;
  }
}

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    authenticated: state.auth.authenticated
  };
};

export default connect(mapStateToProps, { logout })(LogOut);
