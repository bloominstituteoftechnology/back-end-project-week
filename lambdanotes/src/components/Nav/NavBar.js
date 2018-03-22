import React from 'react';

import './NavBar.css';

import AniButton from '../Misc/AniButton/AniButton';

class NavBar extends React.Component {
  render() {
    return (
      <div className="navbar">
        {/* <AniButton /> */}
        {/* <div>LambdaNotes</div> */}
        {this.props.children}
      </div>
    );
  }
}

export default NavBar;
