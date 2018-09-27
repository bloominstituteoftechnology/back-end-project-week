import React, { Component } from 'react';
import NotesList from './NotesList';
import CreateNote from './CreateNote';
import NoteView from './NoteView';
import EditNote from './EditNote';
import { Route, Switch, withRouter } from 'react-router-dom';
import './index.css';
import axios from  'axios';

const url = 'http://localhost:3300/api/notes';

class MainNotes extends Component {
    constructor() {
        super();
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
        axios
            .post(url, {title: this.state.title, body: this.state.body})
            .then(res => {
                this.setState({ dummyNotes: res.data })
            })
            .catch(err => console.log(err));
        this.setState({
            title: '',
            body: ''
        });
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
                            />
                        )} 
                    />
                </Switch>
            </div>
        );
    }
}

export default withRouter(MainNotes);