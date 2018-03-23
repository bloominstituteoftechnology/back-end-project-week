import React from "react";
import "./SelectedNote.css";

const SelectedNote = props => {
  return (
    <div className="SelectedNote">
      <span className="deleteButton" onClick={() => props.showNoteHandler({})}> X </span>
      <h4>Delete the selected post, or clear choice by pressing the 'X'.</h4>
      <div className="SelectedNote__contents">
        <h5 className="SelectedNote__contents--title">{props.selected.title}</h5>
        <div className="SelectedNote__contents--body">{props.selected.noteText}</div>
      </div>
      <button onClick={() => props.deleteNoteHandler()}>{`Delete this post`}</button>
    </div>
  );
};

export default SelectedNote;
