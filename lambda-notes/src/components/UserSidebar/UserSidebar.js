import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Sidebar/Sidebar.css';
import { connect } from 'react-redux';
import { logout } from '../../actions';
class UserSidebar extends Component {
  
  handleLogOut = () => {
    this.props.logout();
  }

  render() {
      return (
        <nav className="Sidebar-container">
          <div className="Sidebar">
            <h1>Lambda Notes</h1>
            <div className="Sidebar-buttons">
            <Link to="/login">
              <button className="Sidebar-button" >
                Login
              </button>
            </Link>
            <Link to="/users">
              <button className="Sidebar-button">
                Register
              </button>
            </Link>
            <Link to="/loggedout">
              <button className="Logout-button" onClick={this.handleLogOut}>Logout</button>
            </Link>
            </div>
          </div>
        </nav>
      )
    }
}

const mapStateToProps = state => {
  return {
    state: state,
  }
}

export default connect(mapStateToProps, { logout })(UserSidebar);
