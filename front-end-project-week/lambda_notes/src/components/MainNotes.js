import React, { Component } from 'react';
import NotesList from './NotesList';
import CreateNote from './CreateNote';
import NoteView from './NoteView';
import EditNote from './EditNote';
import { Route, Switch } from 'react-router-dom';
import './index.css';
import axios from  'axios';

const url = 'http://localhost:3300/api/notes';

export default class MainNotes extends Component {
    constructor(props) {
        super(props);
        this.state= {
            dummyNotes: [],
            title: '',
            body: '',
        }
    }

    componentDidMount() {
        axios
            .get(url)
            .then( res => {
                this.setState({ dummyNotes: res.data })
            })
            .catch(err => {
                console.log('Error:', err);

            })
    }

    addNote = e => {
        e.preventDefault();
        const noteSnapshot = this.state.dummyNotes.slice();
        noteSnapshot.push({
            id: this.state.dummyNotes.length + 1,
            title: this.state.title, // title set by input change handler
            body: this.state.body,
        });
        axios
            .post('http://localhost:3300/api/notes', this.state.title, this.state.body)
            .then(res => {
                this.props.history.push('/notes')
            })
            .catch(err => console.log(err));
        this.setState({
            dummyNotes: noteSnapshot, 
            title: '', // resets title to blank after input change
            body: ''
        });

    }

    editNote = e => {
        e.preventDefault();
        console.log('Object:', e.id)
        console.log('editnoteID:', e.id)
        const noteSnapshot = this.state.dummyNotes.slice();
        const newNote = {
            title: this.state.title,
            body: this.state.body
        }
        this.setState({
            dummyNotes: noteSnapshot,
            title: '',
            body: ''
        })
    }

    handleInputChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        return(
            <div className='notesContainer'>
                <Switch>
                    <Route exact path='/' render={props =>
                        (
                            <NotesList
                                {...props}
                                dummyNotes={this.state.dummyNotes}
                            />
                        )} 
                    />
                    <Route exact path='/note/:id' render={props =>
                        (
                            <NoteView
                                {...props}
                                dummyNotes={this.state.dummyNotes}
                            />
                        )} 
                    />
                    <Route exact path='/create' render={props =>
                        (
                            <CreateNote 
                                {...props}
                                handleInputChange={this.handleInputChange}
                                handleSubmit={this.addNote}
                            /> 
                        )}  
                    />
                    <Route exact path='/edit/:id' render={props =>
                        (
                            <EditNote
                                {...props}
                                handleInputChange={this.handleInputChange}
                                handleSubmit={this.editNote}
                            />
                        )} 
                    />
                </Switch>
            </div>
        );
    }
}