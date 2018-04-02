import React, { Component } from 'react';
import './App.css';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import EditNote from './components/EditNote';
import FullView from './components/FullView';
import ListView from './components/ListView';
import NavBar from './components/NavBar';
import NewNote from './components/NewNote';
import DeleteModal from './components/DeleteModal';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import RequireAuth from './components/HOC/RequireAuth';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          {this.props.modal.showing ? <Route component={DeleteModal} /> : null}
          <div className='NavBar'>
            <NavBar />
          </div>
          <div className='Right'>
            <Route exact path='/' component={SignUp} />
            <Route path='/notes' component={RequireAuth(ListView)} />
            <Route path='/create' component={NewNote} />
            <Route path='/edit' component={EditNote} />
            <Route path='/notes/:id' component={FullView} />
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signout' component={SignOut} />
          </div>
        </div>
      </Router>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
};

export default connect(mapStateToProps)(App);
