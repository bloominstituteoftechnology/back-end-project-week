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
            <Route exact path='/' component={ListView} />
            <Route path='/create' component={NewNote} />
            <Route path='/edit' component={EditNote} />
            <Route path='/notes/:id' component={FullView} />
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
