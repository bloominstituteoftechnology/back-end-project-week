import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getNotes } from '../actions';
import MultiNote from './MultiNote';
import './ViewNotes.css'

class ViewNotes extends Component {
  componentDidMount() {
    this.getTheNotes();
  }
  render () {
    return (
      <div className="Home__Right">
        <div className="Right__Containers">
          <div className="ViewNotes__Text">
            Your Notes:
          </div>
          <div className="Right__NoteHolders">
            {Object.keys(this.props.notes).map(function(sinnote, index) {
              return (
                <MultiNote
                title={this.props.notes[sinnote].title}
                meat={this.props.notes[sinnote].meat}
                />
              );
            }, this)}
          </div>
        </div>
      </div>
    )
  }
  getTheNotes = (event) => {
    console.log('getNotes workin!');
    this.props.getNotes();
  }
}
  // console.log('the props in viewnotes' + this.props.notes)
const mapStateToProps = (state) => {
  return {
    notes: state.Notes
  };
};

export default connect(mapStateToProps, { getNotes })(ViewNotes);