import React from 'react';
import { connect } from 'react-redux';

import { addNote, logout } from '../../actions';

const StatusBar = props => {
  const addNewNoteButtonClickedHandler = _ => {
    const title = 'Put your title here';
    const content = 'Edits are saved everytime you change your focus.';

    props.addNote({ title, content });
  };

  const signOutHandler = _ => {
    props.logout(props.history);
  };

  return (
    <div className="StatusBar">
      <div
        className="StatusBar__addNoteButton"
        onClick={addNewNoteButtonClickedHandler}
      >
        &#65291;
      </div>

      <div className="StatusBar__user">{props.user}</div>

      <div className="StatusBar__signOutButton" onClick={signOutHandler}>
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
