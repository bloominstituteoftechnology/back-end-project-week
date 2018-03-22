import React from 'react';

//import addNoteForm from container -> addNoteForm when completed
//import noteList from container as well when done

const NoteMate = props => {
  return (
    <div className="note-list">
      <h1>Get to Noting!</h1>
      <AddNoteForm/>
      <NoteList/>
    </div>
  );
}

export default NoteMate;
