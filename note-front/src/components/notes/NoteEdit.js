import React from 'react';

export default function NoteEdit(props) {

    return (
        <div>
            <span onClick={() => props.handleShowNote({})}> [ X ] </span>
            <h5>{props.selected._id}</h5>
            <h4>{props.selected.content}</h4>
            <div>{props.selected.text}</div>
            <div>{props.selected.user.username}</div>
            <button onClick={() => props.handleDeleteNote(props.selected._id)}>{`Delete ${
                props.selected.title
            }`}</button>
            <button onClick={() => props.toggleShowUpdate()}>{`Update ${
                props.selected.title
            }`}</button>
        </div>
    );        
}
