import React, { Component } from 'react';
import './App.css';
import NavButton from './components/Misc/NavButton/NavButton';
import Menu from './components/Menu/Menu';
import NavBar from './components/Nav/NavBar';
import AniButton from './components/Misc/AniButton/AniButton';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { visible: false };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  handleMouseDown(e) {
    this.toggleMenu();

    console.log("clicked");
    e.stopPropagation();
  }

  toggleMenu() {
    this.setState(
      {
        visible: !this.state.visible
      }
    )
  }

  render() {
    return (
      <div>
        {/* <NavBar>
          <AniButton handleMouseDown={this.handleMouseDown} />
          LambdaNotes
        </NavBar> */}
        <Menu
          handleMouseDown={this.handleMouseDown}
          menuVisibility={this.state.visible}
        />
        <NavButton className="button--aliRight" />
      </div>
    );
  }
}

export default App;
