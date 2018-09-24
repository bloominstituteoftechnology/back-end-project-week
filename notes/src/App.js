import React, { Component } from 'react';
import './App.css';
import { Link, Route } from "react-router-dom";
import axios from 'axios';


import Notes from "./components/Notes";
import SingleNote from './components/SingleNote'
import Edit from './components/Edit'
import NewNote from './components/NewNote'
// import SideBar from './components/SideBar'
import { Button } from 'reactstrap'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
        // {
        //   _id: 1,
        //   title: "note2",
        //   textBody: "Test Test Test Test"
        // },
        // {
        //   _id: 2,
        //   title: "note1",
        //   textBody: "Test Test Test Test"
        // },
        // {
        //   _id: 3,
        //   title: "note3",
        //   textBody: "Test Test Test Test"
        // },
        // {
        //   _id: 4,
        //   title: "note4",
        //   textBody: "Test Test Test Test"
        // },
        // {
        //   _id: 5,
        //   title: "note5",
        //   textBody: "Test Test Test Test"
        // },
        // {
        //   _id: 6,
        //   title: "note6",
        //   textBody: "Test Test Test Test"
        // },
        // {
        //   _id: 7,
        //   title: "note7",
        //   textBody: "Test Test Test Test"
        // }
      ]

    }

  }
  componentDidMount(){
    this.setState({loading: true});
    axios.get("https://killer-notes.herokuapp.com/note/get/all")
    .then(res => {
      this.setState({notes: res.data, loading:false})
    })
  }

  addNote = note => {
    this.setState({loading: true})
    axios.post("https://killer-notes.herokuapp.com/note/create", note)
    .then(res => {
      axios.get(`https://killer-notes.herokuapp.com/note/get/all/${res.data.success}`)
      .then(res => {
        this.setState(prevState => ({
          notes: [...prevState.notes, res.data],
          loading:false,
        }))
      })
    })
  }
  

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEdit = (e, id, push) => {
    e.preventDefault();

    const notes = this.state.notes.map(eachNote => {
      if (eachNote._id === id) {
        if (this.state.title.length) eachNote.title = this.state.title;
        if (this.state.textBody.length) eachNote.textBody = this.state.textBody;
      }
      return eachNote;
    });

    this.setState({
      notes,
      title: '',
      textBody: '',
    })
    push(`/notes/${id}`)
  }

  handleDelete = (e, id, push) => {
    // delete stuff
    this.setState({ notes: this.state.notes.filter(note => note._id !== id) })
    push('/notes')
  }


  render() {
    return (
      <div className="App container">
        <div className="sidenav">
          <Link to="/" className="home"><h1 className="title">Lambda Notes </h1></Link>
          <Link to='/notes'>
            <Button className="li">View Your Notes</Button>
          </Link>
          <Link to="/new" >
            <Button className="li">+ Create New Note </Button></Link>
        </div>
        <Route exact path="/" render={() =>
          <h1>Welcome to your totally unique and not at all self similar notes app!! WOOOOOOOOOOO!!!</h1>} />

        <Route exact path='/new' render={(props) =>
          <NewNote {...props} handleChange={this.handleChange} addNote={this.addNote} title={this.state.title} textBody={this.state.textBody} />} />

        <Route exact path='/edit/:id' render={(props) =>
          <Edit {...props} handleChange={this.handleChange} handleEdit={this.handleEdit} title={this.state.title} textBody={this.state.textBody} notes={this.state.notes} />} />

        <Route exact path='/notes' render={() =>
          <div><Notes notes={this.state.notes} /></div>} />

        <Route path="/notes/:id" render={(props) =>
          <SingleNote {...props} notes={this.state.notes} handleDelete={this.handleDelete} />} />
      </div>
    );
  }


}

export default App;
