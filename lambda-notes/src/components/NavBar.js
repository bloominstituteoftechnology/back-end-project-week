import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  getLinks() {
    return [
      <li key={1}>
        <Link to="/"><button>View Your Notes</button></Link>
      </li>,
      <li key={2}>
        <Link to={{ pathname: '/create', lastId: this.props.lastId }}><button>+ Create New Note</button></Link>
      </li>
    ];
  };

  render() {
    return (
      <div>
        <div className="navbar-header">
          <Link to="/"><h1>Lambda<br />Notes</h1></Link>
        </div>
        <div className="navbar-buttons">
          <ul>{this.getLinks()}</ul>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  // const notes = state.notes
  return {
    // lastId: notes[notes.length - 1].id
  };
};

export default connect(mapStateToProps)(NavBar);
