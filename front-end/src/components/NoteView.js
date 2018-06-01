// NPM COMPONENTS
import React, { Component } from 'react';
import axios from 'axios';

// STYLING COMPONENTS
import '../Styles.css';

// ROUTER COMPONENTS
import { Link } from 'react-router-dom'

class NoteView extends Component {
  constructor (props){
    super(props)
    this.state={
      notes: props.notes,
    }

    // this.deleteNote = () => {
    //   if(window.confirm("Do you want to delete this note?")){
    //     this.props.deleteNote(this.props.match.params.id);
    //     props.history.push('/');
    //   }
    // }

    this.deleteNote = () => {
      if(window.confirm("Do you want to delete this note?")){
        axios.delete(`https://my-bible-app.herokuapp.com/api/notes/${this.state.notes[this.props.match.params.id]._id}`)
            .then(() => {
                console.log("Deleted note with id of " + this.state.id);
                props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            });
        this.setState({ title: '', text: ''});
      };
    };
  }

  render() {
    return (
      <div className="APP__NOTEVIEW">
        {this.state.notes.map((note, index) => {
          if(index === parseInt(this.props.match.params.id, 10)){
            return(
              <div key={`note${index}`}>
                <div className="APP__NOTE-HEADER">
                  <Link to={`/edit/${index}`} style={{ textDecoration: 'none', color: 'black' }}>edit</Link>
                  <p className="APP__NOTE-DELETE" onClick={() => {this.deleteNote(index)}}>delete</p>
                </div>
                <ThisNote note={note} />
              </div>
            );
          };
          return null;
        })}
      </div>
    );
  };
};

function ThisNote(props) {
  const { title, text } = props.note;
  return (
    <div className="APP__NOTE-FULL">
      <h5 className="APP__NOTE-TITLE">{title}</h5>
      <p className="APP__NOTE-TEXT">{text}</p>
    </div>
  )
};

export default NoteView;