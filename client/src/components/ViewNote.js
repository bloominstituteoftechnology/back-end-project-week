import React from "react";
import { Link } from "react-router-dom";




const ViewNote = props => {

  const id = props.match.params.id;
  const note = props.notes.filter(el => el._id == id)[0];

  return (
    <div className="container1">
      <div>
        <div className="single-header">
          <div className="single-header-link">
            <Link to={`/edit/${id}`}>
              <div>Edit</div>
            </Link>
          </div>
          <div className="single-header-link">

            <Link to={`/delete/${id}`}>
              <div>Delete</div>
            </Link>

          </div>
        </div>

        <div className="single-note-title">
          <h2>{note.noteTitle}</h2>
        </div>
        <p>{note.noteBody}</p>
      </div>
    </div>
  );
};

export default ViewNote;
