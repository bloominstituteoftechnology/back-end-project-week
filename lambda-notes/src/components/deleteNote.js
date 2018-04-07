import React from 'react';
import { NavLink } from 'react-router-dom';
import DeletePopup from './deletePopup';

const DeleteNote = (props) => {
    return (
        <div className="view-note-container">
          <DeletePopup props={props}/>
          <div className="edit-button">
            <NavLink className="edit-link--popup" to="#">
              edit
            </NavLink>
          </div>
          <div className="delete-button">
            <NavLink className="delete-link--popup" to={`/delete/${props.match.params.id}`}>
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
export default DeleteNote;