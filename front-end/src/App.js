// STYLING COMPONENTS
import './Styles.css';

// COMPONENTS
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios';


// REACT COMPONENTS
import MENUBAR from './components/MenuBar';
import LISTVIEW from './components/ListView';
import CREATENOTE from './components/CreateNote';
import NOTEVIEW from './components/NoteView';
import EDITNOTE from './components/EditNote';
// import LOGIN from './components/Login';
// import USERLIST from './components/UserList';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      notes: [],
      // user: [],
    }
  }

  componentDidMount() {
    const self = this;
    axios.get(`https://my-bible-app.herokuapp.com/api/notes`)
        .then(res => {
          self.setState({ notes: res.data })
          console.log("App State: ", self.state);
        })
        .catch(err => {
          console.log(err);
        });
  }

  render() {
    return (
      <Router>
        <div className="APP">
            <div className="APP__MENU">
              <Route path='/' render={( props) => <MENUBAR {...props} notes={this.props.notes} /> }
              />
            </div>
            <div className="APP__BODY">
              <Switch>
                <Route exact path='/' render={( state ) => <LISTVIEW {...state} notes={this.state.notes}/> }
                />
                <Route path='/note/:id' render={( state ) => <NOTEVIEW {...state} notes={this.state.notes}/> }
                />
                <Route path='/edit/:id' render={( state ) => <EDITNOTE {...state} notes={this.state.notes}/> }
                />
                <Route path='/create' component={CREATENOTE} />
              </Switch>
            </div>
        </div>
      </Router>
    );
  }
};

export default App;