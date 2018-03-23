import React, { Component } from 'react';
import './Note-main.css';
import PropTypes from 'prop-types';

class Note extends Component {
    constructor(props) {
        super(props);
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;
    }

    render(props) {
        return (
            <div className="note fade-in">
                <p className="note-content"> {this.noteContent} </p>
            </div>
        );
    }
}

Note.propTypes = {
    noteContent: PropTypes.string
}

export default Note;
