import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar-wrapper">
                <div className="headline-wrapper">
                Lambda <br /> Notes
                </div>
                <Link to="/notes"><div className="button noteslist-home-button">View Your Notes</div></Link>
                <Link to="/create"><div className="button create-note-button">+Create New Note</div></Link>
            </div>
        );
    }
}

export default Sidebar;