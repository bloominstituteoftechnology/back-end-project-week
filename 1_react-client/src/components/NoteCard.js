import React from "react";

import "./NoteCard.css";

const NoteCard = props => {
  // console.log("NoteCard prop:", props);
  return (
    <div className="TextBoxContainer">
      <div className="CardTitle"><h2>{props.eachNote.title}</h2></div>
      <div className="TextBox">{props.eachNote.content}</div>
      <br />
    </div>
  );
};

export default NoteCard;
