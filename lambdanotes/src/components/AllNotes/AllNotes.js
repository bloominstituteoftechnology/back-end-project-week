/* eslint-disable */

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  Switch,
} from 'react-router-dom';
import CreateNotes from '../CreateNotes/CreateNotes';
import ViewNote from '../ViewNote/ViewNote';

class AllNotes extends Component {
  render() {
    return (
      <div className="notes-box">
        <ul className="notes">
          {this.props.notes.map(lnote => {
            const noteParams = {
              pathname: `/view/${lnote.id}`,
              note: lnote,
            };
            return (
              <Link to={noteParams} key={lnote.id}>
                <li className="list-notes">
                  <div className="note-title">{lnote.title}</div>
                  <div />
                  <div className="note-message">{lnote.message}</div>
                </li>
              </Link>
            );
          })}
        </ul>
        <Switch>
          {/* <Route path="/" component={Home} exact /> */}
          {/* <Route path="/" component={View} /> */}
          {/* <Route path="/create" component={Create} /> */}
        </Switch>
      </div>
    );
  }
}

export default AllNotes;
