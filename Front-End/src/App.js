import React, { Component } from 'react';
import axios from 'axios'
import FirstView from './components/Firstview';
import { Route, withRouter } from 'react-router';
import Input from './components/Input';
import NoteList from "./components/NoteList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      userid: '',
      loggedin: false
    }
  }
  login = (credentials) => {
    axios.post('https://notes-backend-nodejs.herokuapp.com/api/login', credentials)
      .then(data => {
        console.log(data);
        this.setState((prevState, props) => {
          return { notes: data.data.notes, loggedin: true, userid: data.data.userid }
        })
        localStorage.setItem('token', data.data.token)
        this.props.history.push('/notes')
      })
  }
  register = (newUser) => {
    axios.post('https://notes-backend-nodejs.herokuapp.com/api/register', newUser)
      .then(data => {
        this.setState((prevState, props) => {
          return { notes: data.notes, loggedin: true, userid: data.userid }
        })
        localStorage.setItem('token', data.data.token)
      })
  }
  logout = () => {
    localStorage.clear()
    this.setState((prevState) => {
      return { loggedin: false, userid: '', notes: [] }
    })
  }
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={FirstView} />
        <Route exact path='/login' render={(props) => <Input {...props} login={this.login} page='login' />} />
        <Route exact path='/notes' render={(props) => <NoteList {...props} notes={this.state.notes} />} />
      </div>
    );
  }
}

export default withRouter(App);