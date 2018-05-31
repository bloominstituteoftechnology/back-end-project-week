import React, { Component } from 'react';
import db from './dummyData.js';
import { withStyles } from '@material-ui/core/styles';

import Wheel from './Navigation/Wheel';
import NoteContainer from './Note/NoteContainer';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundSize: 'cover'
  },
})

class App extends Component {
  state = {
    randomBgUrl: ''
  }
  componentDidMount = () => {
    fetch('https://source.unsplash.com/3000x2000/?nature')
      .then(res => this.setState({ randomBgUrl: res.url }))
      .catch(err => console.log(err))
  }
  render() {
    const { classes } = this.props;
    const { randomBgUrl } = this.state;
    return (
      <div className={classes.root} style={{ background: `url(${randomBgUrl}) no-repeat center` }}>
        <NoteContainer />
        <Wheel />
      </div>
    );
  }
}

export default withStyles(styles)(App);
