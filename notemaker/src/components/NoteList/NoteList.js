
import React, { Component } from 'react';
import './NoteList.css';
import axios from 'axios';
import NotePreview from '../NotePreview/NotePreview';
import { Link } from 'react-router-dom';

class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [] 
        }
    }
    
    componentDidMount() {
        console.log("Hey, I ran!", this.state.notes);

        const apiUrl = process.env.REACT_APP_API;
        console.log(apiUrl+`/notes`);
        axios
        // .get('http://localhost:8888/notes')
        .get(apiUrl+`/notes`)
        .then(response => {
            console.log("GET", response);
            this.setState({notes: response.data.notes });
        })
        .catch(err => {
            console.log(err);
        })
    }

    previewNotes = noteToMap => {
        return (
            <Link to={`/view/${noteToMap.id}`} key={noteToMap.id}>
                <NotePreview 
                title={noteToMap.title}
                content={noteToMap.content}
                key={noteToMap.id}
            />
            </Link>
        )
    }

    render() {
        console.log("Props for NoteList:", this.state)
        return (
            <div className="note-list">
                <h3>Your Notes:</h3>
                <br />

                <div className="note-list-preview-container">
                    {this.state.notes.map(this.previewNotes)}
                </div>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return{
//         notes: state
//     }
// }

export default NoteList;


    // addNote = () => {
    //     const { title, content } = this.state;
    //     const { groupId, addedMedia } = this.props;
    //     this.props.addNote({
    //         title,
    //         content
    //     }, groupId);
    //     this.setState({ title: "", content: "", openAddDialog: false });
    // }

    // editNote = () => {
    //     const { note, selectedNote } = this.state;
    //     const { state } = this;
    //     let myNote = note;
    //     this.props.editNote({
    //         title: note.title,
    //         color: note.color || "#000",
    //         content: note.content
    //     }, note.slug, selectedNote);
    //     this.setState({ ...state, note: { title: ""}, openEditDialog: false })
    // }

    // editOption = (note, selectedNote) => {
    //     this.setState({
    //         openEditDialog: true,
    //         note: note.toJS(),
    //         selectedNote
    //     });
    // }

    // goToNote = (note) => {
    //     this.setState({
    //         note: note.toJS(),
    //         openViewDialog: true
    //     })
    // }

    // const { notes } = this.props;
    //     const { state } = this;

    //     const { title, content, openAddDialog, openEditDialog, openViewDialog, note } = this.state;