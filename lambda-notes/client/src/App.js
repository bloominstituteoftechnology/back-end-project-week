import React, { Component } from 'react';
import {
  BrowserRouter as Router, Route, 
  // Link,
  // Switch,
  // Redirect
} from 'react-router-dom';
import NewView from './components/newview.js';
import NoteView from './components/noteview.js';
import EditView from './components/editview.js';
import Delete from './components/icons/delete.js';
import './App.css';
import Registration from './components/registration';
import ListView from './components/listview';

class App extends Component {
  render() {
    return (
     <Router>
      <div>
        <Route path='/' component={Registration} exact />
        <Route path='/user' component={ListView} />
        <Route path='/edit' component={EditView} />
        <Route path='/create' component={NewView} />
        <Route path='/view' component={NoteView} />
        <Route path='/delete' component={Delete} />
      </div>
     </Router>
    );
  }
}

export default App; 
