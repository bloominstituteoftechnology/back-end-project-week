import React, { Component } from 'react';
import './EditNote.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            note: {
                title: '',
                content: '',
                tags: []
            },
            noteIsLoaded: false
        }
    }    

    componentWillMount() {
        const id = this.props.match.params.id-1;
        this.setState( 
            axios
                .get('http://localhost:8888/notes')
                .then(response => {
                    console.log("GET", response);
                    this.setState({ notes: response.data.notes, 
                        noteIsLoaded: true,
                        note: {
                            title: response.data.notes[id].title,
                            content: response.data.notes[id].content,
                            tags: []
                        }
                    });
                    console.log("LINE 39: ", this.state);
                })
                .catch(err => {
                    console.log(err);
                })
            );
    }

    editHandler = (state) => {
        Object.assign({}, state, { note: document.getElementById("note-content") });
        console.log(this);
    }

    noteTitle = () => {
        return this.state.noteIsLoaded 
            ? this.state.notes[this.props.match.params.id-1].title
            : null
    }

    noteContent = () => {
        return this.state.noteIsLoaded
        ? this.state.notes[this.props.match.params.id-1].content
        : null 
    }

    changeHandler = (e) => {
        let currentInput = { ...this.state.note };
        currentInput[e.target.name] = e.target.value;
        this.setState({ note: currentInput });
    }

    putNote = e => {
        e.preventDefault();
        
        const id = this.props.match.params.id;
        const note = { title: this.state.note.title, content: this.state.note.content }
        
        // console.log("STATES: ", this.state);
        console.log("NOTE: ", note);
        console.log("ID: ", id);
        axios
            .put(`http://localhost:8888/notes/${id}`, note)
            .then(response => {
                console.log(response.data);
                console.log("PUT Response", response);
                this.props.history.push('/');
            })
            .catch( error => console.log(error));
    };

    render() {
        // console.log(this.props.initialData.notes[this.props.match.params.id].title)
        return (
            <div className="new-note">
                <h3>Edit Note:</h3>
                <input 
                className="note-title" 
                placeholder="Note Title"
                name="title" 
                defaultValue={this.noteTitle()}
                onChange={this.changeHandler}
                ></input>
                <br />
                <input 
                className="note-content" 
                placeholder="Note Content" 
                name="content"
                defaultValue={this.noteContent()}
                onChange={this.changeHandler}
                ></input>

                {/* <Link to="/"> */}
                    <div className="note-save-button"
                    onClick={this.putNote}
                    >
                        <div className="update-link-text">Update</div>
                    </div>
                {/* </Link> */}
            </div>
        )
    }
}

export default EditNote;