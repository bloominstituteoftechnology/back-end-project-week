import React, { Component } from "react";
import { Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { testData } from "./testData";
import NoteList from "./components/NoteList";
import CreateNote from "./components/CreateNote";
import Note from "./components/Note";
// import SimpleStorage from "react-simple-storage";
import { AppContainer } from "./components/styles";
import axios from 'axios'

// for reference const GET = "https://killer-notes.herokuapp.com/note/get";
// const ALL = "http://localhost:3300/api/notes";
const ALL = "http://localhost:3300/note/get/all";
const CREATE = "http://localhost:3300/note/create";
const DELETE = "http://localhost:3300/note/delete";
const GET = "http://localhost:3300/note/get";
const PUT = "http://localhost:3300/note/edit";

class App extends Component {
  state = {
    notes: []
  };

  componentDidMount() {
		axios.get(ALL).then(response => {
			this.setState({ notes: response.data});
		});
	}

  handleCreateNote = note => {
		axios.post(CREATE, note).then(response => {
				this.setState(prevState => {
          return {
            notes: [...prevState.notes, {...note, id: response.data.id}]
          }
				});
		});
	};

  handleEdit = (id, edited) => {
		axios.put(`${PUT}/${id}`, edited).then(response => {
			this.setState(prevState => ({
				notes: prevState.notes.map(note => {
					if (note.id == response.data.id) {
						return response.data;
					} else {
						return note;
					}
				})
			}));
		});
	};

  handleDeleteNote = id => {
		axios.delete(`${DELETE}/${id}`).then(() => {
			axios.get(ALL).then(response => {
				this.setState({ notes: response.data});
			});
		});
	};

  // removed this from render: <SimpleStorage parent={this} />
  render() {
    console.log("App", this.props);
    return (
      <AppContainer>
        <Sidebar />
        <Route
          exact
          path="/"
          render={() => <NoteList notes={this.state.notes} />}
        />
        <Route
          exact
          path="/notes"
          render={() => <NoteList notes={this.state.notes} />}
        />
        <Route
          exact
          path="/create"
          render={() => <CreateNote handleSubmit={this.handleCreateNote} />}
        />
        {/* this route will handle the single note view as well as editing and deleting */}
        <Route
          exact
          path="/notes/:id"
          render={props => (
            <Note
              {...props}
              notes={this.state.notes}
              handleSubmit={this.handleEdit}
              handleDelete={this.handleDeleteNote}
            />
          )}
        />
      </AppContainer>
    );
  }
}

export default App;
