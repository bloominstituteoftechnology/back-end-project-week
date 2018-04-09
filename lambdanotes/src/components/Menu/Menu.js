import React, { Component } from "react";
import "./Menu.css";



class Menu extends Component {
  render() {
    return (
      <div>
        <div className="header">
          <h1 className="title">LambdaNotes</h1>
        </div>
        <input type="checkbox" className="openSidebarMenu" id="openSidebarMenu" />
        <label for="openSidebarMenu" className="sidebarIconToggle">
          <div className="spinner diagonal part-1"></div>
          <div className="spinner horizontal"></div>
          <div className="spinner diagonal part-2"></div>
        </label>
        <div id="sidebarMenu">
          <ul className="sidebarMenuInner">
            <li> {this.username}</li>
            <li><a href="#" target="_blank">test</a></li>
            <li><a href="#" target="_blank">test</a></li>
            <li><a href="#" target="_blank">test</a></li>
            <li><a href="#" target="_blank">test</a></li>
            <li><a href="#" target="_blank">test</a></li>
          </ul>
        </div>
      </div>
    );
  }
}



export default Menu;
