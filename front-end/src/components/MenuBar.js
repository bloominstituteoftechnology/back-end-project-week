// REACT COMPONENTS
import React, { Component } from "react";
import { CSVExporter } from './CSVExporter';

// STYLING COMPONENTS
import '../Styles.css';

// ROUTING COMPONENTS
import { Link } from 'react-router-dom';

class MenuBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      notes: props.notes,
      user: [],
    }
    // this.storage = window.localStorage;
  }

  render() {
    return (
      <div className='APP__MENUBAR'>
        <h1>Lambda<br/>Notes</h1>
          <Link to="/"><button className="APP__MENUBUTTON">
            View Your Notes
          </button></Link>
          <Link to="/create"><button className="APP__MENUBUTTON">
            + Create New Note
          </button></Link>
          <button className="APP__MENUBUTTON"
            onClick={() => {
              CSVExporter(this.state.notes);
            }}>Download Notes</button>
          <div className="APP__LOGINWRAPPER">
            <input className="APP__LOGININFO"
              type='text'
              onChange={this.handleInput}
              placeholder='username'
              name='username'
              value={this.state.username}
            />
            <input className="APP__LOGININFO"
              type='text'
              onChange={this.handleInput}
              placeholder='password'
              name='password'
              value={this.state.username}
            />
            <button>Login</button>
          </div>
      </div>
    );
  };
};



export default MenuBar;