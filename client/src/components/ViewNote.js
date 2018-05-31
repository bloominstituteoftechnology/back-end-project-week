import React from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import axios from 'axios'; 

const ViewNote = props => {
  // console.log("from viewNote...", props);
  const id = props.match.params.id;
  const note = props.notes.filter(el => el._id == id)[0];
  // console.log("from viewNote...", id);


  const deleteItem  = () => {
    axios.delete(`https://boiling-wildwood-28100.herokuapp.com/delete/${id}`)
    .then(resp => this.props.update())
    .catch(err => console.log(err))
  }

  const handleDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="delete">
            <p>Are you sure You want to delete this note?</p>
            <div className="delete-btns">
              <button
                onClick={() => {
                  // console.log('from handle delete',props.delete)
                  deleteItem();
                  onClose();
                }}
                className="deleteBtn"
              > Delete</button>

              <button
                onClick={() => {
                  onClose();
                }}
                className="noBtn"
              >No</button>
            </div>
          </div>
        );
      }
    });
  };

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
            <Link to={"/"}>
              <div onClick={handleDelete}> Delete </div>{" "}
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
