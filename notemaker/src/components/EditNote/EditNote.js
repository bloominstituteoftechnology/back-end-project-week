import React, { Component } from 'react';
import './EditNote.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            note: [],
            noteIsLoaded: false
        }
    }    

    componentWillMount() {
        const apiUrl = process.env.REACT_APP_API;
        const id = this.props.match.params.id;
        this.setState( 
            axios
                // .get('http://localhost:8888/notes')
                .get(apiUrl+`/notes/${id}`)
                .then(response => {
                    console.log("GET", response);
                    this.setState({  
                        note: {
                            title: response.data.note[0].title,
                            content: response.data.note[0].content,
                            tags: []
                        },
                        noteIsLoaded: true
                    });
                    console.log("LINE 39: ", this.state);
                })
                .catch(err => {
                    console.log(err);
                })
            );
        this.noteContent();
    }

    editHandler = (state) => {
        Object.assign({}, state, { note: document.getElementById("note-content") });
        console.log(this);
    }

    noteTitle = () => {
        return this.state.noteIsLoaded 
            ? this.state.note.title
            : ''
    }

    noteContent = () => {
        return this.state.noteIsLoaded
        ? this.state.note.content
        : ''
    }

    changeHandler = (e) => {
        let currentInput = { ...this.state.note };
        currentInput[e.target.name] = e.target.value;
        this.setState({ note: currentInput });
    }

    putNote = e => {
        e.preventDefault();
        
        const apiUrl = process.env.REACT_APP_API;
        const id = this.props.match.params.id;
        const note = { title: this.state.note.title, content: this.state.note.content }
        
        // console.log("STATES: ", this.state);
        // console.log("NOTE: ", note);
        // console.log("ID: ", id);
        axios
            // .put(`http://localhost:8888/notes/${id}`, note)
            .put(apiUrl+`/notes/${id}`, note)
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
                <textarea 
                className="note-content" 
                placeholder="Note Content" 
                name="content"
                value={this.noteContent()}
                onChange={this.changeHandler}
                ></textarea>

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