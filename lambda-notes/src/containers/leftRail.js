import React, { Component } from 'react';
import Authenticator from '../components/authenticator';
// import ViewNotesBtn from '../components/viewNotesBtn';
// import CreateNewNote from '../components/createNoteBtn';

class LeftRail extends Component {
    render() {
        return (
            this.props.authenticated ?
            <div className="left-rail">
                <Authenticator />
                <h1 className="left-rail__title">
                    Lambda Notes
                </h1>
            </div> :
            <div className="left-rail">
                <Authenticator />
            </div>
        )   
    }
}


export default LeftRail;