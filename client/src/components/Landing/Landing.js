import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import NewNoteForm from './components/Forms/NewNoteForm';

class Landing extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){

  }


  render() {
    return (
      <div className="App">
        <Link to="/newnote">Add New Note</Link>
        <Link to="/notelist">View Notes</Link>
        <Link to="login">Login</Link>
        <Route path="/newnote"{...rest} render={(props) => { <NewNoteForm {...props} /> }} />
        <Route path="/notelist"{...rest} render={(props) => { <NoteList {...props} /> }} />
        <Route path="/login" {...rest} render={(props) => { <Login {...props} /> }} />
      </div>
    );
  }
}

export default Landing;
