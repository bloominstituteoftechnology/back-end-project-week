import React from 'react';

import './NavBar.css';

import AniButton from '../Misc/AniButton/AniButton';

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <AniButton />
        <div>LambdaNotes</div>
      </div>
    );
  }
}

export default NavBar;
