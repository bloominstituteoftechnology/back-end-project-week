import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userLogout } from '../Redux/actions/index';

class UserLogout extends Component {
  render() {
    this.props.userLogout(this.props.history);
    return <div>Logged out.</div>;
  }
}

export default connect(null, { userLogout })(UserLogout);
