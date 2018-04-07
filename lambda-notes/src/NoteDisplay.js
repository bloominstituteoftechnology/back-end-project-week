import React from 'react';
import './NoteDisplay.css';

const NoteDisplay = (props) => {
  return (
    <div className="container">
      <div className="Title">{props.notetitle}</div>
      <div className="Content">{props.noteContent}</div>
    </div>
  );
};

export default NoteDisplay;
