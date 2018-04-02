import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNotes } from '../actions';

class ListView extends Component {
  componentDidMount() {
    this.props.getNotes();
  }

  render() {
    return (
      <div>
        <div className="title">
          Your Notes:
        </div>
        <div className="notes">
          {this.props.notes.map((note) => {
            return (
              <Link key={note.id} to={{ pathname: `/notes/${note.id}`, note: note }}>
                <div className="note">
                  <div className="note-title">
                    {note.title.length > 20 ? note.title.split('').slice(0, 15).join('') + '...' : note.title}
                  </div>
                  <div className="note-content">
                    {note.content.length > 150 ? note.content.split('').slice(0, 150).join('') + '...' : note.content}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
};

export default connect(mapStateToProps, { getNotes })(ListView);