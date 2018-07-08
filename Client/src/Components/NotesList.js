import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import IndivNote from './IndivNote';


class NotesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes: [{}]
        }
    }
    
    componentDidMount(){
        let promise = axios.get("http://localhost:25851/api/notes" );
        promise
            .then(response => {
                this.setState(response.data)
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    
    render() {
        return (
            <div className="noteslist-wrapper-with-sidebar">
                <Sidebar />
                <div className="noteslist-page-wrapper minus-sidebar">
                    <h3 className="page-header">Your Notes</h3>
                    <ul className="noteslist-wrapper">
                        {this.state.notes.map(item => {
                            console.log(item._id);
                            return(
                                <li className="indiv-note" key={item.note_title + item.note_body}>
                                    <Link 
                                        className="note-body"
                                        to={{ 
                                        pathname: `notes/${item._id}`, 
                                        state: {id: item._id, note_title: item.note_title, note_body: item.note_body}
                                    }}>
                                    <IndivNote
                                        note_title={item.note_title}
                                        note_body={item.note_body}
                                        id={item._id}
                                    /></Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default NotesList;