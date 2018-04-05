import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  { getNotes } from '../actions';
import  { abcSort } from '../actions';
import SideBar from './SideBar';
import '../styles/ViewNotes.css';


class ViewNotes extends Component {

  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    return (
      <div className="container">
        <SideBar />
        <div className="viewNotesBody">
          <div className="header">Your Notes:</div>
            <div>
              <button className ="sortButton" onClick={() => this.props.abcSort('title')}>ABC</button>
            </div>
            <div className="allNotes">
              {this.props.notes.map((note, i) => {
                return (
                  <div className="noteCard" key={i}>
                    <Link to={`/view-note/${note._id}`}>
                      <div className="noteTitle">{note.title}</div>
                      <div className="noteBody">{note.body}</div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
  };
};

export default connect(mapStateToProps, { getNotes, abcSort })(ViewNotes);