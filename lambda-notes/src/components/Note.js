import React, { Component } from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import { DeleteNote } from '.';
import axios from 'axios';


class Note extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showNote: true,
            note: []
         }
    }

    componentDidMount() {
        axios
            .get(`http://localhost:5000/api/notes/${this.props.match.params.id}`)
            .then(note => {
                this.setState(() => ({ note: note.data }));
            })
            .catch(err => {
                console.error("Server error:", err)
            })
    }

    updateDisplay = () => {
        this.state.showNote = !this.state.showNote;
    }

    render() {  
        const id = this.props.match.params.id;
        const { title, body } = this.state.note;
        console.log("NOTE", this.state.note.title)

        // if(this.state.showNote === false){
        //     return <span></span>;
        // }

        return (
            <div className='note-container'> 
                <div className="note-links">
                    <Link className='edit-delete' onClick={this.updateDisplay()} to={`/note/${id}/edit`}>
                        Edit
                    </Link>
                       <DeleteNote />
                    
                    
                </div>
                <div className="view-note">
                    <h2> {title} </h2>
                    <p>{body}</p>
                </div>
            </div>    
        )
    }
}
 
export default Note;