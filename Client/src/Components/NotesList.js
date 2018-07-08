import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import IndivNote from './IndivNote';

const port = "5000";


class NotesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes: [{}]
        }
    }
    
    componentWillMount(){
        let promise = axios.get(`http://localhost:${port}/api/notes`);
        promise
            .then(response => {
                this.setState({notes: response.data});
                console.log(this.state.notes);
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
                            console.log(item);
                            return(
                                <li className="indiv-note" key={item.title + item.body}>
                                    <Link 
                                        className="note-body"
                                        to={{ 
                                        pathname: `notes/${item._id}`, 
                                        state: {id: item._id, title: item.title, body: item.body, author: item.author}
                                    }}>
                                    <IndivNote
                                        title={item.title}
                                        body={item.body}
                                        author={item.author}
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