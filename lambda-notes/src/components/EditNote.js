import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class EditNote extends Component {
    constructor(props) {
        super(props);
        const id = this.props.match.params.id
        this.state = {
            title: '',
            body: '',
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

    handleNoteInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    updateNote = () => {
        const id = this.props.match.params.id;
        const newNote = { title: this.state.title, body: this.state.body};

        axios
            .put(`http://localhost:5000/api/notes/${this.props.match.params.id}`, newNote)
            .then(editedNote => {
                this.setState({ title: '', body: '' })
            })
            .catch(err => {
                console.error(err);
            })
        window.location.reload();
    }

    render() { 
        console.log("EDIT PROPS", this.props)
        console.log("EDIT PROPS", this.state.note.title)
        return ( 
            <div className="new-note-container">
                <h2>Edit Note:</h2>
                <div className="new-note">
                    <input
                        className="note-title"
                        type="text"
                        onChange={this.handleNoteInput}
                        name="title"
                        value={this.state.title}
                        placeholder='Title'
                    />
                    <textarea
                        className="note-body"
                        type="text"
                        onChange={this.handleNoteInput}
                        name="body"
                        value={this.state.body}
                        placeholder='Type Notes Here!' >
                    </textarea>
                    <Link to={`/`} >
                        <button onClick={this.updateNote} className="save-note">
                            Update
                        </button>
                    </Link>
                </div>
            </div>
         )
    }
}
 
export default EditNote;