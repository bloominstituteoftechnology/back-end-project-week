import React, { Component } from 'react';
import Authenticator from '../components/authenticator';
// import ViewNotesBtn from '../components/viewNotesBtn';
// import CreateNewNote from '../components/createNoteBtn';

class LeftRail extends Component {
    render() {
        return (
            <div className="left-rail">
                <Authenticator />
                <h1 className="left-rail__title">
                    Lambda Notes
                </h1>
            </div>
        )   
    }
}


export default LeftRail;