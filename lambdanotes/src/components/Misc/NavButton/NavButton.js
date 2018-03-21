import React from 'react';

import './NavButton.css';

class NavButton extends React.Component {
  render() {
    return (
      <div className="wrapper">
        <input id="customBox" className="customBox" type="checkbox" />
        <label for="customBox" />

        <div className="one fas fa-pen-square" />
        <div className="two fas fa-star" />
        <div className="three fas fa-share" />
      </div>
    );
  }
}

export default NavButton;
