import React from "react";

import { NoteCardWrapper } from "../styles";

import { Link } from "react-router-dom";

const NoteCard = ({ note }) => (
  <NoteCardWrapper>
    <Link to={`/notes/${note.id}`}>
      <h3>
        {note.title.split("").length > 15
          ? note.title
              .split("")
              .splice(0, 15)
              .join("")
              .concat("...")
          : note.title}
      </h3>
      <p>
        {note.content.split("").length > 150
          ? note.content
              .split("")
              .splice(0, 150)
              .join("")
              .concat("...")
          : note.content}
      </p>
    </Link>
  </NoteCardWrapper>
);

export default NoteCard;
