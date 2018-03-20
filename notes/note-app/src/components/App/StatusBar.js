import React from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';

const StatusBar = props => {
  return (
    <div className="StatusBar">
      <NavLink to="/" className="StatusBar__goToHomeButton">
        &#x2302;
      </NavLink>

      <div className="StatusBar__signOutButton" onClick={props.signOutHandler}>
        {!props.authenticated ? 'Sign In' : 'Sign out'}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, {})(StatusBar);
