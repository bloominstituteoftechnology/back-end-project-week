import React, { Component } from 'react';
import './Helper/IconLibrary'; //build custom fontawsome library of icons
import injectSheet from 'react-jss';

import BackgroundWrapper from './Helper/BackgroundWrapper';
import NoteContainer from './Note/NoteContainer';
import Wheel from './Navigation/Wheel';

class App extends Component {
  state = {
    randomBgUrl: ''
  }
  componentDidMount = () => {
    fetch('https://source.unsplash.com/2000x1800/?nature,sunset')
      .then(res => this.setState({ randomBgUrl: res.url }))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <BackgroundWrapper randomBgUrl={this.state.randomBgUrl}>
        <NoteContainer />
        <Wheel />
      </BackgroundWrapper>
    );
  }
}

export default App;
