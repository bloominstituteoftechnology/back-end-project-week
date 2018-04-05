import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import UserSidebar from '../UserSidebar/UserSidebar';

const HomePage = () => {
  return (
    <div className="HomePage">
      <UserSidebar />
      <div className="HomePage-Text">
        Welcome to LambdaNotes!
      </div>
    </div>
  )
}

export default HomePage;