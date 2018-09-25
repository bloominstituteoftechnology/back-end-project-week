import React, { Component } from 'react';
import './index.css';

import NotesList from '../NotesList/NotesList';
// import Notes from '../../Components/Notes';

import NoteView from '../NoteView/NoteView';
// import NoteView from '../NoteView';

import DeleteNote from '../DeleteNote/DeleteNote';


import CreateNote from '../CreateNote/CreateNote';
import EditNote from '../EditNote/EditNote';
// import DeleteNote from '../DeleteNote/DeleteNote';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

// import createBrowserHistory from 'history/lib/createBrowserHistory';

class MainContent extends Component {
    state = {
        notes: [],
    }


    render() {
        console.log("MC History", this.props.history)
        return (
            <div className="main_container">
            
                <Switch>
                    <Route path='/' exact render={(props) => <NotesList state={this.state} />} />
                    <Route path='/note/:id' exact render={({match}, props) => <NoteView state={this.state} match={match} />} />
                    <Route path='/note/:id' component={DeleteNote} />
                    <Route path='/create' exact component={CreateNote} />
                    <Route path='/edit/:id' exact render={({match}, props) => <EditNote state={this.state} match={match} />} />
                </Switch>
            
            </div>
        )
    }

    componentDidMount(){ 
        axios
            .get('http://localhost:5000/notes')
            .then(res => {
                this.setState({ notes: res.data });
            })
            .catch(err => {
                console.error('Axios Error Retrieving Data', err)
            });
    };
}

export default MainContent;