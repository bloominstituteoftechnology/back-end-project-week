import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import About from '../About/About';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import NotesContainer from '../NotesContainer/NotesContainer'; 
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Home.css';

class Home extends Component {

    render() {
        return (
            <div className='homeContainer'>
                <Navigation />
                {localStorage.getItem('jwt') ? <Route exact path='/' component={NotesContainer} /> : <Route exact path='/' component={About} />}
                {localStorage.getItem('jwt') ? null : <Route exact path='/signup' component={Signup} />}
                {localStorage.getItem('jwt') ? null : <Route exact path='/login' component={Login} />}
                {/* <Route exact path='/api/users/:userId/notes' component={} />  */}
                {/* <Route exact path='/api/users/:userId/notes/createnote' component={CreateNote} /> */}
                {/* <Route exact path='/api/users/:userId/notes/editnote' component={EditNote} />  */}
                {/* <Route exact path='/api/users/:userId/notes/:noteId' component={Note} />  */}
            </div>
        )
    }
}

export default withRouter(connect(null)(Home)); 