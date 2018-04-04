import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import '../styles/Sidebar.css';

import { logout } from '../actions';

class Sidebar extends React.Component {
  state = {
    redirect: false,
  }
  
  logout = () => {
    this.props.logout();
    this.setState({ redirect: true });
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
          {this.props.loggedIn && (
            <Link to="/" onClick={this.logout}>
              <div className="sidebar__button">Logout</div>
            </Link>
          )}
        </div>
        {this.state.redirect && <Redirect to='/login'/>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps, { logout })(Sidebar);
