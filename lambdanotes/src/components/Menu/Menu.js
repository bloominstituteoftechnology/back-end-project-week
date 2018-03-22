import React, { Component } from 'react';

import AniButton from '../Misc/AniButton/AniButton';

import './Menu.css';

class Menu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { visible: false };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu = () => {
    this.setState({ visible: !this.state.visible });
  };

  handleMouseDown = e => {
    this.toggleMenu();

    console.log('clicked');
    e.stopPropagation();
  };

  render() {
    let visibility = 'hide';
    if (this.props.menuVisibility) {
      visibility = 'show';
    }

    return (
      <div
        className="flyOut"
        onMouseDown={this.props.handleMouseDown}
        className={visibility}
      >
        <h2>
          <a href="#">test</a>
        </h2>
        <h2>
          <a href="#">test</a>
        </h2>
        <h2>
          <a href="#">test</a>
        </h2>
        <h2>
          <a href="#">test</a>
        </h2>
      </div>
    );
  }
}

export default Menu;
