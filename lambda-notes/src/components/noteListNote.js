import React from 'react';

const NoteListNote = (props) => {
    return (
        <div className="note-list-note">
            <div className="note-list-note__title">
                {props.title}
            </div>
            <div className="note-list-note__content">
                {props.content}
            </div>
        </div>
    )
}

export default NoteListNote;