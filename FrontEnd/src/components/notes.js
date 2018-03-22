import React, { Component } from 'react';

const Notes = (props) => {
  return (
    <li className="note-post">
      <h3 className="note-title">{props.note.title}</h3>
      <p className="note-body">{props.note.body}</p>
      {props.note.email && <span className="author-email">{props.note.email}</span>}
      {
        (!props.note.email || props.note.email === props.userEmail)
        &&
        <div>
          <button className="delete-note" onClick={() => props.delete(props.note.id)}>Delete Note</button>
          <button className="edit-note" onClick={() => props.edit(props.note, props.index)}>Edit Note</button>
        </div>
      }
    </li>
  );
}

export default Notes;