import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import './index.css';

import NotesList from '../NotesList/NotesList';
import NoteView from '../NoteView/NoteView';
import DeleteNote from '../DeleteNote/DeleteNote';
import CreateNote from '../CreateNote/CreateNote';
import EditNote from '../EditNote/EditNote';



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
                    <Route path='/note/:id' exact component={DeleteNote} />
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