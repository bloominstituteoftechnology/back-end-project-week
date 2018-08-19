import React from "react";

const IndivNote = props => {
  return (
    <div className="indiv-note-container">
      <h3 className="note-title">{props.title}</h3>
      <hr />
      <p className="note-body">{props.content}</p>
    </div>
  );
};

export default IndivNote;
