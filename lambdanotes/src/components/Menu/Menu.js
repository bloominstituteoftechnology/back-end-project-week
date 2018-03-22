import React, { Component } from 'react';
import { PropTypes } from 'react';

import './Menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <div className={this.state.open ? 'open' : ''}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Menu;
