import React, { Component } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Notesview from "./components/Notesview";
import CreateNote from "./components/InputNote";
import SingleNote from "./components/SingleNote";
import { Route, Switch } from "react-router-dom";
import fileDownload from "js-file-download";
import axios from "axios";

class App extends Component {
  // what a note object looks like { title: string, body: string(maybe markdown formatted), id: num, checklist: [{checked: boolee, name:string}], tags: [string] }
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      nextID: 0,
      mode: "ADD"
    };
  }
  formatForDB = noteObj =>{
    noteObj.userID =0;
    noteObj.checklist = JSON.stringify(noteObj.checklist);
    noteObj.tags = JSON.stringify(noteObj.tags);
    return noteObj
  }
  addNote = noteObj => {
      noteObj = this.formatForDB(noteObj);
      axios
      .post("http://localhost:3000/notes",noteObj)
      .then((response)=> {
        // handle success
        let prevNotes = [...this.state.notes];
        prevNotes.push(response.data);
        this.setState({
          notes: prevNotes
        })
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  };
  editNote = noteObj => {
    noteObj = this.formatForDB(noteObj);
    axios
    .post(`http://localhost:3000/notes/${noteObj.id}`,noteObj)
    .then((response)=> {
      let prevNotes = this.state.notes.slice();
      const moddedArray = prevNotes.map(e => {
        if (e.id === response.data.id) {
          e.title = response.data.title;
          e.body = response.data.body;
          e.tags = response.data.tags;
          e.checklist = response.data.checklist;
          return e;
        } else {
          return e;
        }
      });
      this.setState({
        notes: moddedArray
      });
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
  };
  deleteNote = noteID => {
    axios
    .delete(`http://localhost:3000/notes/${noteID}`)
    .then(()=>{
      this.getNotesList();
    })
    .catch(function(error) {
      console.log(error);
    });
  };
  invertCheck = (itemID, checkName) => {
    let prevNote = this.state.notes.slice();
    prevNote.forEach((e,i)=>{
      if (e.id === itemID){
         e.checklist.map(element => {
          if (element.name === checkName) {
            element.checked = !element.checked;
            return element;
          } else {
            return element;
          }
        });
        this.editNote(e);
      }
    })
  };
  //this is to allow rearrangement via drag and drop of cards
  changeOrder = newOrderProp => {
    this.setState({
      notes: newOrderProp
    });
  };

  jsonToCSV = () => {
    //https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
    const items = this.state.notes;
    const replacer = (key, value) => (value === null ? "" : value);
    const header = Object.keys(items[0]);
    let csv = items.map(row =>
      header
        .map(fieldName => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    csv = csv.join("\r\n");
    fileDownload(csv, "data.csv");
  };

  getNotesList = ()=>{
    axios
    .get("http://localhost:3000/notes")
    .then((response)=> {
      // handle success
      this.setState({
        notes: response.data
      })
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
  }
  

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.notes !== prevState.notes) {

    }
  };
  componentDidMount = () => {
    this.getNotesList();
  };
  render() {
    return (
      <div className="App">
        <Sidebar export={this.jsonToCSV} />
        <Switch className="switch">
          <Route
            exact
            path="/input"
            render={props => (
              <CreateNote
                add={this.addNote}
                {...props}
                mode={this.state.mode}
              />
            )}
          />
          <Route
            exact
            path="/input/:id"
            render={props => (
              <CreateNote
                edit={this.editNote}
                {...props}
                notes={this.state.notes}
              />
            )}
          />
          <Route
            exact
            path="/:id"
            render={props => (
              <SingleNote
                {...props}
                notes={this.state.notes}
                delete={this.deleteNote}
                invert={this.invertCheck}
              />
            )}
          />

          <Route
            path="/"
            render={props => (
              <Notesview
                {...props}
                notes={this.state.notes}
                changeStateOrder={this.changeOrder}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
