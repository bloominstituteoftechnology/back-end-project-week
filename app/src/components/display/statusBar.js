import React from 'react';
import { connect } from 'react-redux';

import { addNote, logout } from '.../.../actions';

const StatusBar = props => {
    const addNoteButtonClickedHandler = _ => {
        props.addNote({ title: 'Victory', content: 'That is a win' });
    };

    const signOutHandler = _ => {
        props.logout(props.history);
    };

    return (
        <div className="StatusBar">
            <div
                className="StatusBar__addNoteButton"
                onClick={addNoteButtonClickedHandler}>
            </div>
            <div className="StatusBar__user">{props.user}</div>
            <div className="StatusBar__signOutButton" onClick={signOutHandler}>
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