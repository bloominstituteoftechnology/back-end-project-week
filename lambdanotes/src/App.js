import React, { Component } from 'react';
import './App.css';
import NavButton from './components/Misc/NavButton/NavButton';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem/MenuItem';
import NavBar from './components/Nav/NavBar';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar className="App-Header" />
        <Menu />
        <div /*className="App"*/>
          <NavButton className="button--aliRight" />
        </div>
      </div>
    );
  }
}

export default App;
