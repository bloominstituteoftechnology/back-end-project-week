import React, { Component } from 'react';
// import './NotLoggedIn.css';
import { connect } from 'react-redux';
import { authUser } from '../../actions';
import UserSidebar from '../UserSidebar/UserSidebar';
import './NotLoggedIn.css';

class NotLoggedIn extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.authUser();
    }
  }
  
  render() {
    return (
      <div className="Container">
        <div className="Sidebar-Container">
          <UserSidebar />
        </div>
        <div className="Main-Text">
        Must Login to view this page!
        If you do not have an account, please register!!
        </div>
    </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    state: state,
  }
}

export default connect(mapStateToProps, { authUser })(NotLoggedIn);
