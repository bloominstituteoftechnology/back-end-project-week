import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  
  return (
    <div className="App">
      <div className='Nav-Bar'>
        <Link className='fas fa-globe' to='/'></Link>
        <Link className='fas fa-user-plus' to='/signup'></Link>
        <Link className='fas fa-sign-in-alt' to='/signin'></Link>
        <Link className='fas fa-users' to='/users'></Link>
      </div>
    </div> 
  );
};

export default Navigation;