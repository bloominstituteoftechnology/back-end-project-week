import React, { Component } from 'react';
import NoteList from '../components/noteList';
import NewNote from '../components/newNote';
import ViewNote from '../components/viewNote';
import EditNote from '../components/editNote';
import DeleteNote from '../components/deleteNote';
import ScrollToTop from '../components/scrollToTop';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';



class CoreRail extends Component {
  render() {
    return (
      <div className="core-rail">
        <Router onUpdate={() => window.scrollTo(0, 0)}>
        <ScrollToTop>
        <div>
        <div className="left-top-btn">
        <NavLink className="navButton-top" to="/notes">View Your Notes</NavLink>
        </div>
        <div className="left-bottom-btn">
        <NavLink className="navButton-bottom" to="/new">+ Create New Note </NavLink>
        </div>
        <Route render={(routeProps) => (
          <NoteList {...routeProps} {...this.props} />
        )} path="/notes" exact/>
        <Route render={(routeProps) => (
          <NewNote {...routeProps} {...this.props} />
        )} path="/new"/>
        <Route render={(routeProps) => (
          <ViewNote {...routeProps} {...this.props} />
        )} path="/note/:title/:content/:id/" />
        <Route render={(routeProps) => (
          <EditNote {...routeProps} {...this.props} />
        )} path="/edit/:id/:title/:content" />
        <Route render={(routeProps) => (
          <DeleteNote {...routeProps} {...this.props} />
        )} path="/delete/:id/:title/:content" />
        </div>
        </ScrollToTop>
        </Router>
        </div>
    )
  }
}

export default CoreRail;
