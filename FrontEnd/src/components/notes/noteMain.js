import React from 'react';

import NoteForm from '../noteForm/index';
import NoteList from '../noteList/index';

const NoteMate = props => {
  return (
    <div className="note-list">
      <h1>Get to Noting!</h1>
      <NoteForm />
      <NoteList />
    </div>
  );
}

export default NoteMate;
