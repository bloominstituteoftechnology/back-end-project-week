import React, { Component } from 'react';
import './App.css';
import NavButton from './components/Misc/NavButton/NavButton';
import Menu from './components/Menu/Menu';
import NavBar from './components/Nav/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar className="App-Header" />
        <Menu
          handleMouseDown={this.handleMouseDown}
          menuVisibility={true}
        />
        <NavButton className="button--aliRight" />
      </div>
    );
  }
}

export default App;
