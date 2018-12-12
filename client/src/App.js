import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {withRouter} from 'react-router';
import axios from 'axios';
import SideBar from './components/SideBar';
import NoteForm from './components/NoteForm';
import Notes from './components/Notes';
import NoteView from './components/NoteView';
import LogIn from './components/LogIn';
import Register from './components/Register';



class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      title: '',
      textBody: '',
      user_id: 1,
      loggedIn: false,
      users: []
    }
  }

  

  authenticate = () => {
    const token = localStorage.getItem('secret_token');
    const options = {
      headers: {
        authorization: token
      }
    }
    if(token) {
      axios
      .get('http://localhost:8000/api/notes', options)
      .then((response) => 
        this.setState({ loggedIn: true, notes: response.data }))
      .catch(error => console.log(error));
      this.props.history.push('/login');
    } else {
      this.props.history.push('/login');
    }
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    this.authenticate();
    // axios
    // .get('http://localhost:8000/api/notes')
    // .then(response => 
    //   this.setState({ notes: response.data }))
    // .catch(error => console.log(error));
  }

componentDidUpdate(prevProps) {
  const {pathname} = this.props.location;
  if (pathname === '/' && pathname !== prevProps.location.pathname) {
    this.authenticate();
  }
  // axios
  // .get('http://localhost:8000/api/notes')
  // .then(response => 
  //   this.setState({ notes: response.data }))
  // .catch(error => console.log(error));
}



  render() {
    return (
      <div className="App">
      <SideBar />

      <div className="main-page-container">
      <Route
      path = "/new-note"
      render = {props => (
        <NoteForm {...props}
        changeHandler={this.changeHandler}
        notes={this.state.notes}/>
      )}/>

        
        <Route
        exact path = "/"
        render = {props =>(
          <Notes {...props}
          notes={this.state.notes}
          changeHandler={this.changeHandler}
          editNote={this.editNote}/>
        )}/>

        <Route
        path = '/notes/:id'
        render = {props => (
          <NoteView {...props}/>
        )}/>

        <Route
        path = '/login'
        render = {props => (
          <LogIn {...props}/>
        )}/>

        <Route
        path = '/register'
        render = {props => (
          <Register {...props}/>
        )}/>
        </div>

      </div>
    );
  }
}

export default withRouter(App);
