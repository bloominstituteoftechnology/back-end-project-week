import React from 'react';
import '../styles/EditNoteForm.css';
const EditNoteForm = props => {
  let theTitle = "test";
  let theText = "test";

  const handleTitleChange = event => {
    theTitle = event.target.value;
  };

  const handleTextChange = event => {
    theText = event.target.value;
  };
  
  const submitEdits = () => {
    props.handleUpdateNote({id: props.note.id, title: theTitle, text: theText, user: props.note.user, notes: props.notes });
    theTitle = "";
    theText = "";
  }
  return (
    <div className="editnote__container">
      <form className="editnote__form">
        <input
          value={props.title}
          name="title"
          type="text"
          placeholder={props.note.title}
          onChange={ handleTitleChange }
          />
        <input
          value={props.text}
          name="theText"
          type="text"
          placeholder={props.note.text}
          onChange={ handleTextChange }
          />
        <button onClick={() => submitEdits()} type="button">
          Edit Note
        </button>
        <div>User: {props.note.user}</div>
      </form>
    </div>
  );
};

export default EditNoteForm;