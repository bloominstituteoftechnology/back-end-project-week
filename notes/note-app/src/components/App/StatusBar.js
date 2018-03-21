import React from 'react';
import { connect } from 'react-redux';

import { addNote, logout } from '../../actions';

// import { NavLink } from 'react-router-dom';

const StatusBar = props => {
  const addNewNoteButtonClickedHandler = _ => {
    props.addNote({ title: 'hello', content: 'world' });
  };

  const signOutHandler = _ => {
    props.logout(props.history);
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

      <div className="StatusBar__user">{props.user}</div>

      <div className="StatusBar__signOutButton" onClick={signOutHandler}>
        {/* {!props.authenticated ? 'Sign In' : 'Sign out'} */}
        Sign out
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, { addNote, logout })(StatusBar);
