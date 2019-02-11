import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useMappedState, useDispatch } from "redux-react-hook";

import Modal from "./Modal";

import { NoteWrapper, EditDelete } from "../styles";

import { fetchNote, deleteNote, openModal, closeModal } from "../actions";
import NotFound from "./NotFound";

const mapState = ({ notes, note, open }) => ({
  notes,
  note,
  open
});

const Note = ({ handleUpdate, history, match }) => {
  const { notes, note, open } = useMappedState(mapState);
  const dispatch = useDispatch();
  const { id } = match.params;

  useEffect(
    () =>
      notes.find(note => note.id == id) &&
      dispatch(
        fetchNote(
          id,
          { headers: { authorization: localStorage.getItem("token") } },
          history
        )
      ),
    []
  );

  return notes.find(note => note.id == id) ? (
    note && (
      <>
        <EditDelete>
          <span onClick={() => handleUpdate(note.id)}>Edit</span>
          <Modal
            showModal={() => dispatch(openModal())}
            note={note}
            handleDelete={() => {
              dispatch(
                deleteNote(
                  note.id,
                  { headers: { authorization: localStorage.getItem("token") } },
                  history
                )
              );
              dispatch(closeModal());
              history.push("/");
            }}
            open={open}
            isOpen={open}
            hideModal={() => dispatch(closeModal())}
          />
        </EditDelete>
        <NoteWrapper>
          <h2>{note.title}</h2>
          <p> {note.content}</p>
        </NoteWrapper>
      </>
    )
  ) : (
    <NotFound />
  );
};

export default withRouter(Note);
