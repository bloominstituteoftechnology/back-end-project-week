import React, { Component } from "react";
import { connect } from "react-redux";

import { loggedOut } from "../Actions";

class Navigation extends Component {
  logOut = event => {
    event.preventDefault();
    this.props.loggedOut();
  };

  render() {
    return (
      <div className="Navigation">
        <div className="Navigation--Brand">Note Mate</div>
        <p style={this.props.loggedIn ? {color: 'black'} : {display: 'none'}} onClick={this.logOut} className="Navigation--LogOut">
          Log Out
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  };
};

export default connect(mapStateToProps, { loggedOut })(Navigation);
