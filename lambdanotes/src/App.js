import React, { Component } from 'react';
import './App.css';
import Button from './Misc/button/button';
import NavDrawer from './NavDrawer/NavDrawer';
import MenuItem from './NavDrawer/MenuItem/MenuItem';

const handleToggle = () => this.setState({ open: !this.state.open });
const handleClose = () => this.setState({ open: false });
class App extends Component {
  render() {
    return (
      <div>
        <NavDrawer />
        <div /*className="App"*/>
          <Button className="button--aliRight" />
        </div>
      </div>
    );
  }
}

export default App;
