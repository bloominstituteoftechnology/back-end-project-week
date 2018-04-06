import React, { Component, Link } from "react";

class Menu extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="menu">
        <div className="menu__header">
          <p>Sparks Notes</p>
        </div>

        <div className="menu__buttons">
          <a href="/" className="menu__buttons__links"><div className="menu__buttons--align">
            <p className="menu__buttons__text" >View Your Notes</p>
          </div></a>

          <a href="/newnote" className="menu__buttons__links"><div className="menu__buttons--align">
            <p className="menu__buttons__text">+ Create New Note</p>
          </div></a>

          <a href="/login" className="menu__buttons__links"><div className="menu__buttons--align">
            <p className="menu__buttons__text">Login</p>
          </div></a>

          <a href="/register" className="menu__buttons__links"><div className="menu__buttons--align">
            <p className="menu__buttons__text">Register</p>
          </div></a>
        </div>
      </div>
      )
  }
}

export default Menu;