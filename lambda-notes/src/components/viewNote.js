import React from 'react';
import { NavLink } from 'react-router-dom';

const ViewNote = (props) => {
    console.log("NoteView props: ", props);
    // const getNoteIndex = () => {
    //   for (let i = 0; i < props.notes.length; i++) {
    //       if (+props.match.params.id === props.notes[i].id) {
    //           // console.log('index in if statement: ', i)
    //           return i;
    //       }
      
      // }
      // console.log('How is i defined here? ')
    // }
    return (
      <div className="view-note-container">
        <div className="edit-button">
          <NavLink className="edit-link" to={`/edit/${props.match.params.id}/${props.match.params.title}/${props.match.params.content}`}>
            edit
          </NavLink>
        </div>
        <div className="delete-button">
          <NavLink className="delete-link" to={`/delete/${props.match.params.id}/${props.match.params.title}/${props.match.params.content}`}>
            delete
          </NavLink>
        </div>
        <div className="view-note__title">
        {props.match.params.title}
        </div>
        <div className="view-note__content">
        {props.match.params.content}
        </div>
      </div>
    )
}

export default ViewNote;