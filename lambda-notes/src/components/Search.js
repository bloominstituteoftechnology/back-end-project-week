import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { search_results_clicked, load_notes } from '../actions/index';

import './css/Search.css';

const ROUTE = 'https://pure-sands-16313.herokuapp.com/notes/';

class Search extends React.Component {
  state = {
    title: '',
    body: '',
  };

  render() {
    return (
      <div className="search">
        <h1 className="search-header">Search for a Title</h1>
        <input className="searchbar" onChange={this.handleTitleChange} />
        <h1 className="search-header"> Or... </h1>
        <h1 className="search-header">Search within the body</h1>
        <input className="searchbar" onChange={this.handleBodyChange} />
        <button className="search-button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };
  handleBodyChange = (event) => {
    this.setState({ body: event.target.value });
  };
  handleSearch = () => {
    axios.get(`${ROUTE}${this.props.user}`).then((data) => {
      this.props.load_notes(data.data.foundNotes);
      let results = [];
      if (this.state.title === '') {
        results = this.search({ term: this.state.body, type: 'body' });
        this.props.search_results_clicked(results);
      } else if (this.state.body === '') {
        results = this.search({ term: this.state.title, type: 'title' });
        this.props.search_results_clicked(results);
      } else alert('Search either by title OR body');
    });
  };

  search = (term) => {
    let lowerTerm = term.term.toLowerCase();
    let results = [];
    const notes = this.props.notes;
    notes.forEach((note) => {
      if (term.type === 'title') {
        let lowerTitle = note.title.toLowerCase();
        let alphaNumeric = note.title.toLowerCase().replace(/[^a-zA-Z ]/g, '');
        if (lowerTerm === lowerTitle || lowerTerm === alphaNumeric || lowerTitle.includes(lowerTerm)) {
          results.push(note);
        }
      }
      if (term.type === 'body') {
        let flag = false;
        let body = note.body.split(' ');
        body.forEach((word) => {
          let lowerWord = word.toLowerCase();
          let alphaNumeric = word.toLowerCase().replace(/[^a-zA-Z ]/g, '');
          if (lowerTerm === lowerWord || lowerTerm === alphaNumeric || lowerWord.includes(lowerTerm)) {
            flag = true;
          }
        });
        if (flag === true) {
          results.push(note);
          flag = false;
        }
      }
    });
    return results;
  };
}

const mapStateToProps = (state) => {
  return {
    notes: state.currentUserNotes,
    user: state.currentUser,
  };
};

export default connect(mapStateToProps, { search_results_clicked, load_notes })(Search);
