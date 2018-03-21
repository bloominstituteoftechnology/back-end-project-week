import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  headerClickedHandler = _ => {
    // this.props.headerClicked();
  };

  render() {
    return (
      <NavLink to="/" className="Header" onClick={this.headerClickedHandler}>
        Notes&reg;
      </NavLink>
    );
  }
}

export default Header;
