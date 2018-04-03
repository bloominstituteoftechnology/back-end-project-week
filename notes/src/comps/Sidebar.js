import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Sidebar.css';

import { logout } from '../actions';

class Sidebar extends React.Component {  
  logout = () => {
    axios
      .post('http://localhost:3030/logout')
      .then()
      .catch(err => console.log(err));
    this.props.logout();
  };
  render() {
    return (
      <div className="sidebar">
        <span className="sidebar__title">Lambda Notes</span>
        <div className="sidebar__buttons">
          <Link to="/" className="sidebar__button">
            <div>View Your Notes</div>
          </Link>
          <Link to="/new" className="sidebar__button">
            <div>+ Create New Note</div>
          </Link>
          {this.props.authed && <div onClick={this.logout} className="sidebar__button">Logout</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authed: state.authed,
  }
}

export default connect(mapStateToProps, { logout })(Sidebar);
