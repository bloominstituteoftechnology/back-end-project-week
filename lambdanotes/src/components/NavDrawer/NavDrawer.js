import React, { Component } from 'react';
import { PropTypes } from 'react';

import './NavDrawer.css';

class NavDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <div>
          <div className={this.state.open ? 'open' : ''}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default NavDrawer;
