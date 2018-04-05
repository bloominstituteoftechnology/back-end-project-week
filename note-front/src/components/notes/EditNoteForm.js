import React from 'react';
import '../../styles/EditNoteForm.css';


const EditNoteForm = props => {
  let theTitle = "test";
  let theContent = "test";
  const handleTitleChange = event => {
    theTitle = event.target.value;
  };

  const handleContentChange = event => {
    theContent = event.target.value;
  };
  
  const submitEdits = () => {
    props.handleUpdateNote({id: props.note._id, title: theTitle, content: theContent, user: props.note.user._id, }, props.history);
    theTitle = "";
    theContent = "";
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
          value={props.content}
          name="theText"
          type="text"
          placeholder={props.note.content}
          onChange={ handleContentChange }
          />
        <button onClick={() => submitEdits()} type="button">
          Edit Note
        </button>
        <div>User: {props.note.user.username}</div>
      </form>
    </div>
  );
};

export default EditNoteForm;