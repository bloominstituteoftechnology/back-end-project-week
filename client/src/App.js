import React, { Component } from 'react';
import './Helper/IconLibrary'; //build custom fontawsome library of icons
import injectSheet from 'react-jss';

import Container from './Navigation/Container';
import Wheel from './Navigation/Wheel';

const styles = {
  root: props => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  })
}

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Container />
        <Wheel />
      </div>
    );
  }
}

export default injectSheet(styles)(App);
