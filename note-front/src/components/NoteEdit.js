import React from 'react';

export default function NoteEdit(props) {
    return (
        <div>
            <span onClick={() => props.handleShowNote({})}> [ X ] </span>
            <h4>{props.selected.title}</h4>
            <div>{props.selected.text}</div>
            <div>{props.selected.user}</div>
            <button onClick={() => props.handleDeleteNote()}>{`Delete ${
                props.selected.title
            }`}</button>
            <button onClick={() => props.toggleShowUpdate()}>{`Update ${
                props.selected.title
            }`}</button>
        </div>
    );        
}
