import React from 'react';
import './SignOut.css';
import UserSidebar from '../UserSidebar/UserSidebar';

const SignOut = () => {
  return (
    <div className="Container">
      <div className="Sidebar-container">
        <UserSidebar />
      </div>
      <div className="Loggedout">
        <header>
          <h1>Logged Out</h1>
        </header>
      </div>
    </div>
  )
}

export default SignOut;