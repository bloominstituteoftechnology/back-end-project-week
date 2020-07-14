import React from "react";
import {Link} from "react-router-dom";

const NoteCard = props => (
    <div className="note-card">
        <Link className="note-title-font" to={`/view/${props.note.id}`}><h5>{props.note.title}</h5></Link>
        <div className="divider"></div>
        <p className="note-body-font">{props.note.content}</p>
    </div>
);

export default NoteCard;