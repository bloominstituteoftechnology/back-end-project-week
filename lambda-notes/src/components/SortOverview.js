import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Note from './Note';

import { remove_edit, load_notes } from '../actions/index';

import './css/SortOverview.css';

const ROUTE = 'https://pure-sands-16313.herokuapp.com/notes/';

class SortOverview extends React.Component {
  state = {
    sort: 'sort',
    reverse: false,
    sorted: [],
  };
  render() {
    return (
      <div className="sort">
        {this.state.sort === 'sort' ? (
          <div>
            <h1 className="sort-header"> How Would You Like to Sort? </h1>
            <div>
              <button className="sort-buttons" onClick={this.clickAlphabetically}>
                Alphabetically by Title
              </button>
              <button className="sort-buttons" onClick={this.clickRevAlphabetically}>
                Reverse Alphabetically by Title
              </button>
              <button className="sort-buttons" onClick={this.clickChronologically}>
                Chronologically by Date
              </button>
              <button className="sort-buttons" onClick={this.clickRevChronologically}>
                Reverse Chronologically by Date
              </button>
            </div>
          </div>
        ) : null}
        {this.state.sort === 'alphabetically' ? (
          <div>
            {this.state.reverse ? (
              <h1 className="sort-header"> Reverse Alphabetically Sorted by Title</h1>
            ) : (
              <h1 className="sort-header"> Alphabetically Sorted by Title</h1>
            )}
            <ul className="sorted-notes">
              {this.props.notes.map((note, index) => {
                return <Note key={note._id} note={{ ...note, index: index }} />;
              })}
            </ul>
          </div>
        ) : null}
        {this.state.sort === 'chronologically' ? (
          <div>
            <h1 className="sort-header"> Chronologically Sorted by Date</h1>
            <ul className="sorted-notes">
              {this.props.notes.map((note, index) => {
                return <Note key={note._id} note={{ ...note, index: index }} />;
              })}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }

  clickAlphabetically = () => {
    this.setState({ sort: 'alphabetically', reverse: false });
    axios.get(`${ROUTE}${this.props.user}`).then((data) => {
      this.props.load_notes(data.data.foundNotes);
      const notes = this.props.notes;
      notes.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      this.setState({ sorted: notes });
      this.props.remove_edit();
    });
  };

  clickChronologically = () => {
    this.setState({ sort: 'chronologically', reverse: false });
    axios.get(`${ROUTE}${this.props.user}`).then((data) => {
      this.props.load_notes(data.data.foundNotes);
      const notes = this.props.notes;
      notes.sort((a, b) => {
        if (a.date < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      this.setState({ sorted: notes });
      this.props.remove_edit();
    });
  };

  clickRevAlphabetically = () => {
    this.setState({ sort: 'alphabetically', reverse: true });
    axios.get(`${ROUTE}${this.props.user}`).then((data) => {
      this.props.load_notes(data.data.foundNotes);
      const notes = this.props.notes;
      notes.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      notes.reverse();
      this.setState({ sorted: notes });
      this.props.remove_edit();
    });
  };

  clickRevChronologically = () => {
    this.setState({ sort: 'chronologically', reverse: true });
    axios.get(`${ROUTE}${this.props.user}`).then((data) => {
      this.props.load_notes(data.data.foundNotes);
      const notes = this.props.notes;
      notes.sort((a, b) => {
        if (a.date < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      notes.reverse();
      this.setState({ sorted: notes });
      this.props.remove_edit();
    });
  };
}

const mapStateToProps = (state) => {
  return {
    notes: state.currentUserNotes,
    user: state.currentUser,
  };
};

export default connect(mapStateToProps, { remove_edit, load_notes })(SortOverview);
