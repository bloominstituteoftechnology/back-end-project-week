import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Notes extends Component {
    state={
        notes:[],
    }
    componentDidMount() {
        this.getNotes();
    }

    getNotes = () => {
        axios
        .get(`https://lambda-notes-brandon.herokuapp.com/notes`)
        .then(response => {
            this.setState({ notes: response.data});
        })
        .catch(err => {
            console.log(err);
        });
    }
    render(){
        return (
        <div className="rightSide">
        <h2 className='yourNotes'>Your Notes:</h2> 
        <div className="listthing">
        {this.state.notes.map(note => {
            return (
          <Link to={`/note/${note.id}`}>  
           <div key={note.id} className="borderGore">
           {note.title} <br />
            {note.text}</div></Link>
            )
        })}
        </div>
         </div>
    )
}
}
export default Notes;