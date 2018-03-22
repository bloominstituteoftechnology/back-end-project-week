import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class Logout extends Component {
  componentWillMount() {
    this.props.logoutUser();
  }

  render() {
    return <div>Good bye! Thanks for noting!</div>;
  }
}

export default connect(null, actions)(Logout);