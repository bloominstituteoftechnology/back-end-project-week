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
      title: '',
      textBody: '',
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
    //get notes
    // this.setState({loading: true});
    // axios.get("http://localhost:8000/api/notes")
    // .then(res => {
    //   this.setState({notes: res.data, loading:false})
    //   console.log(this.state.notes)
    // })
    this.getNotes();
  }

  getNotes = () => {
    this.setState({loading: true});
    axios.get("http://localhost:8000/api/notes")
    .then(res => {
      this.setState({notes: res.data, loading:false})
      console.log(this.state.notes)
    })
  }

  addNote = () => {
    this.setState({loading: true})
    axios.post("http://localhost:8000/api/notes/", {title:this.state.title, body:this.state.textBody})
    .then(res => {
      this.getNotes();
    })
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEdit = (e, id, redirect) => {
    e.preventDefault();
    this.setState({loading: true});
    console.log(this.state.title)
    console.log(this.state.textBody)
    axios.put(`http://localhost:8000/api/notes/${id}`, {title:this.state.title, body:this.state.textBody})
    .then(res => {
      // this.setState(prevState => ({
      //   notes: prevState.notes.map(note => {
      //     if (note.id === res.data.id){
      //       return res.data
      //     }
      //     else{
      //       return note
      //     }
      //   }),
      //   loading: false,
      // }))
      this.getNotes();
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleDelete = ( id, push)  => {
    // delete stuff
    axios.delete(`http://localhost:8000/api/notes/${id}`)
    .then(res => {
      this.getNotes()
      //seems id is not being passed in
      console.log(id)
      push('/notes')
    })
    .catch(err => {
      console.log(err)

    })
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
          <Edit {...props} handleChange={this.handleChange} handleEdit={this.handleEdit} title={this.state.title} textBody={this.state.body} notes={this.state.notes} />} />

        <Route exact path='/notes' render={() =>
          <div><Notes notes={this.state.notes} /></div>} />

        <Route path="/notes/:id" render={(props) =>
          <SingleNote {...props} handleDelete={this.handleDelete} />} />
      </div>
    );
  }


}

export default App;
