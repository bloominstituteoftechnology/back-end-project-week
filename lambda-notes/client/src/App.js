import React, { Component } from 'react';
// import ListView from './components/listview.js';
// import NewView from './components/newview.js';
// import NoteView from './components/noteview.js';
// import EditView from './components/editview.js';
// import Delete from './components/icons/delete.js';
import Registration from './components/registration.js';
import './App.css';

class App extends Component {
  render() {
    return (
 <Registration />
          // <Router>
          //   <div>
          //   <Route exact path='/' component={ListView} exact/>
          //   <Route path='/newview' component={NewView}/>
          //   <Route path='/noteview' component={NoteView}/>
          //   <Route path='/editview' component={EditView}/>
          //   <Route path='/delete' component={Delete}/>
          //   </div>
          // </Router>
    );
  }
}

export default App;