import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { addUser, login, signout } from '../../store/actions/actions';
import { connect } from 'react-redux';
// components
import NoteList from '../NoteList/NoteList';
import Note from '../Note/Note';
import Auth from '../Auth/Auth';

import './App.css';

class App extends Component {
  state = {
    authenticated: '',
    uName: 'TroyW',
    uPass: 'Open',
    username: '',
    password: '',
    attempted: false,
    user: ''
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  checkAuthorization = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
    this.setState({
      username: '',
      password: '',
      attempted: true
    });
  };

  signOutHandler = () => {
    this.props.signout();
  };

  render() {
    if (!this.props.authenticated) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Troy's Note List Project</h1>
            Sign in to do stuff
          </header>
          <Auth
            state={this.state}
            addNewUser={this.addNewUser}
            checkAuthorization={this.checkAuthorization}
            inputChangeHandler={this.inputChangeHandler}
          />
        </div>
      );
    }
    return (
      <div className="App">
        <Container>
          <header className="App-header">
            <h1>Troy's Note List Project</h1>
            <Button onClick={this.signOutHandler}>Sign out</Button>
          </header>
          <Router>
            <Switch>
              <Route path="/notes" component={NoteList} />
              <Route path="/notes/:id" component={Note} />
            </Switch>
          </Router>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.reducer.user,
    authenticated: state.reducer.authenticated
  };
};

export default connect(mapStateToProps, { addUser, login, signout })(App);
