import React from 'react';
import './HomePage.css';
import UserSidebar from '../UserSidebar/UserSidebar';

const HomePage = () => {
  return (
    <div className="Container">
      <div className="Sidebar-Container">
        <UserSidebar />
      </div>
      <div className="HomePage-Text">
        Welcome to LambdaNotes!
      </div>
    </div>
  )
}

export default HomePage;