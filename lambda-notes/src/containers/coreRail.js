import React from 'react';
import NoteList from '../components/noteList';
import NewNote from '../components/newNote';
import ViewNote from '../components/viewNote';
import EditNote from '../components/editNote';
import DeleteNote from '../components/deleteNote';
import ScrollToTop from '../components/scrollToTop';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';


const CoreRail = (props) => {
  console.log('CoreRail props: ', props);
  
    return (
      <div className="core-rail">
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <ScrollToTop>
            <div>
              <div className="left-top-btn">
                <NavLink className="navButton-top" to="/">View Your Notes</NavLink>
              </div>
              <div className="left-bottom-btn">
                <NavLink className="navButton-bottom" to="/new">+ Create New Note </NavLink>
              </div>
              <Route render={(routeProps) => (
                      <NoteList {...routeProps} {...props} />
                  )} path="/notes" exact/>
              <Route render={(routeProps) => (
                      <NewNote {...routeProps} {...props} />
                  )} path="/new"/>
              <Route render={(routeProps) => (
                      <ViewNote {...routeProps} {...props} />
                  )} path="/note/:id/:title/:content" />
              <Route render={(routeProps) => (
                      <EditNote {...routeProps} {...props} />
                  )} path="/edit/:id/:title/:content" />
              <Route render={(routeProps) => (
                      <DeleteNote {...routeProps} {...props} />
                  )} path="/delete/:id/:title/:content" />
            </div>
          </ScrollToTop>
        </Router>
      </div>
    )
}

export default CoreRail;