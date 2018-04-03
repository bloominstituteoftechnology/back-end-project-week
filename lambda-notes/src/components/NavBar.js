import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../actions';

class NavBar extends Component {

  logOut = (event) => {
    event.preventDefault();
    this.props.logout();
  }

  getLinks() {
    return [
      <li key={1}>
        <Link to="/notes"><button>View Your Notes</button></Link>
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
        <p className="navbar-logout" style={this.props.login ? {color: 'black'} : {display: 'none'}} onClick={this.logOut}>Log Out</p>
      </div>
    );
  };
}

const mapStateToProps = state => {
  // const notes = state.notes
  return {
    // lastId: notes[notes.length - 1].id
    login: state.login
  };
};

export default connect(mapStateToProps, { logout })(NavBar);
