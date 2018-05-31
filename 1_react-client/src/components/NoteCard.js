import React from "react";

const NoteCard = props => {
  // console.log("NoteCard prop:", props);
  return (
    <div className="TextBoxContainer">
      <div className="CardTitle">{props.eachNote.title}</div>
      <div className="TextBox">{props.eachNote.content}</div>
      <br />
    </div>
  );
};

export default NoteCard;
