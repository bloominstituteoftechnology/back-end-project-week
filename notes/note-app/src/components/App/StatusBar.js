import React from 'react';
import { connect } from 'react-redux';

import { addNote, logout } from '../../actions';

// import { NavLink } from 'react-router-dom';

const StatusBar = props => {
  const addNewNoteButtonClickedHandler = _ => {
    props.addNote({ title: 'hello', content: 'world' });
  };

  return (
    <div className="StatusBar">
      {/* <NavLink to="/" className="StatusBar__goToHomeButton">
        &#x2302;
      </NavLink> */}

      <div
        className="StatusBar__addNoteButton"
        onClick={addNewNoteButtonClickedHandler}
      >
        &#65291;
      </div>
      {/* <div className="StatusBar__addNoteButton">+</div> */}

      <div className="StatusBar__signOutButton" onClick={props.signOutHandler}>
        {/* {!props.authenticated ? 'Sign In' : 'Sign out'} */}
        Sign out
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    // authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps, { addNote, logout })(StatusBar);
