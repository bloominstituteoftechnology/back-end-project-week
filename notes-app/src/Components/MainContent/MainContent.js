import React, { Component } from 'react';
import './index.css';

import NotesList from '../NotesList/NotesList';
// import Notes from '../../Components/Notes';

import NoteView from '../NoteView/NoteView';
// import NoteView from '../NoteView';

import DeleteNote from '../DeleteNote/DeleteNote';
import CreateNote from '../CreateNote/CreateNote';
import Registration from '../Registration/Registration';
import EditNote from '../EditNote/EditNote';
import Welcome from '../Welcome/Welcome';
import Login from '../Login/Login';

import { Route, Switch } from 'react-router-dom';
import axios from 'axios';


class MainContent extends Component {
    state = {
        notes: [],
        currentNotes: [],
        currentPage: null,
        totalPages: null
    }




    render() {
        console.log("MC History", this.props.history)
        return (
    
        <div className="main_container">
            
                <Switch>
                    <Route path='/notes' exact render={(props) => <NotesList state={this.state}   />} />
                    <Route path='/note/:id' render={({match}, props) => <NoteView state={this.state} match={match} />} />
                    <Route path='/note/:id' exact component={DeleteNote} />
                    <Route path='/create' exact component={CreateNote} />
                    <Route path='/edit/:id' exact render={({match}, props) => <EditNote state={this.state} match={match} />} />
                    <Route path='/' exact component={Registration} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/welcome' exact component={Welcome} />
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