import React, { useState, useMutationEffect, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import NProgress from "nprogress";
import { useMappedState, useDispatch } from "redux-react-hook";
import { TransitionGroup } from "react-transition-group";

import { Container } from "../styles";
import { GlobalStyle } from "../styles/global";

import Navigation from "../components/Navigation";
import NoteContainer from "./NoteContainer";
import Form from "../components/Form";
import Note from "../components/Note";
import NotFound from "../components/NotFound";
import Login from "../components/Login";
import Register from "../components/Register";

import Fade from "../styles/transition";

import { DEFAULT_NOTE_VALUES, HEADER } from "../constants";

import {
  fetchNotes,
  addNote,
  editNote,
  displayEditForm,
  hideEditForm,
  sortList,
  toggleSort
} from "../actions";

const mapState = ({ notes, editing, showSort, criteria }) => ({
  notes,
  editing,
  showSort,
  criteria
});

const App = ({ history, location }) => {
  const { notes, editing, showSort, criteria } = useMappedState(mapState);
  const dispatch = useDispatch();
  const [newNote, setNewNote] = useState(DEFAULT_NOTE_VALUES);

  useMutationEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchNotes(HEADER, history));
    } else history.push("/login");
  }, []);

  useEffect(
    () => {
      NProgress.start();
      NProgress.done();
    },
    [location]
  );

  const handleSubmit = e => {
    e.preventDefault();
    const trimmedNote = Object.assign(
      ...Object.entries(newNote).map(([k, v]) => ({ [k]: v.trim() }))
    );
    dispatch(addNote(trimmedNote, HEADER, history));
    setNewNote(DEFAULT_NOTE_VALUES);
    redirect();
  };

  const handleUpdate = id => {
    const noteToUpdate = notes.find(note => note.id === id);
    setNewNote(noteToUpdate);
    dispatch(displayEditForm());
    history.push("/form");
  };

  const handleSubmitUpdate = e => {
    e.preventDefault();
    dispatch(editNote(newNote, HEADER, history));
    history.push(`notes/${newNote.id}`);
    setNewNote(DEFAULT_NOTE_VALUES);
    dispatch(hideEditForm());
  };

  const cancelForm = () => {
    if (editing === true) {
      dispatch(hideEditForm());
    }
    setNewNote(DEFAULT_NOTE_VALUES);
    history.goBack();
  };

  const sortAToZ = e => {
    e.preventDefault();
    dispatch(
      sortList((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      })
    );
  };

  const sortZToA = e => {
    e.preventDefault();
    dispatch(
      sortList((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return 1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return -1;
        }
        return 0;
      })
    );
  };

  const redirect = () => {
    history.push("/");
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Navigation
          editing={editing}
          cancelEdit={() => {
            dispatch(hideEditForm());
            setNewNote(DEFAULT_NOTE_VALUES);
          }}
          notes={notes}
          history={history}
        />
        <TransitionGroup className="transition">
          <Fade key={location.key} unmountOnExit={true} timeout={1000}>
            <Switch location={location}>
              <Route
                exact
                path="/"
                render={props => (
                  <NoteContainer
                    {...props}
                    notes={notes.filter(
                      note =>
                        note.title.toLowerCase().includes(criteria) ||
                        note.content.toLowerCase().includes(criteria)
                    )}
                    toggleSort={() => dispatch(toggleSort())}
                    sortAToZ={sortAToZ}
                    sortZToA={sortZToA}
                    showDropdown={showSort}
                  />
                )}
              />
              <Route
                path="/form"
                render={props => (
                  <Form
                    {...props}
                    editing={editing}
                    newNote={newNote}
                    setNewNote={setNewNote}
                    handleSubmit={editing ? handleSubmitUpdate : handleSubmit}
                    handleCancel={cancelForm}
                  />
                )}
              />
              <Route
                path="/notes/:id"
                render={props => (
                  <Note {...props} handleUpdate={handleUpdate} />
                )}
              />
              <Route path="/login" render={props => <Login {...props} />} />
              <Route
                path="/register"
                render={props => <Register {...props} />}
              />
              <Route component={NotFound} />
            </Switch>
          </Fade>
        </TransitionGroup>
      </Container>
    </>
  );
};

export default withRouter(App);
