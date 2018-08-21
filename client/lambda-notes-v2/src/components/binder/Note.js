import React from 'react';

const Note = (props) => {
    return(
        <div className="note">

            <h3 className="note-title">
                {props.mappedNote.title}
            </h3>

            <p className="note-body">
                {props.mappedNote.content}
            </p>

        </div>
    )
};

export default Note;
