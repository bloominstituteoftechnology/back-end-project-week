import React, { Component } from 'react';
import './App.css';
// import NavButton from './components/Misc/NavButton/NavButton';
import NavDrawer from './components/NavDrawer/NavDrawer';
import MenuItem from './components/NavDrawer/MenuItem/MenuItem';
import NavBar from './components/Nav/NavBar';

const handleToggle = () => this.setState({ open: !this.state.open });
const handleClose = () => this.setState({ open: false });
class App extends Component {
  render() {
    return (
      <div>
        <NavBar className="App-Header" />
        <NavDrawer />
        <div /*className="App"*/>
          {/* <NavButton className="button--aliRight" /> */}
        </div>
      </div>
    );
  }
}

export default App;
