import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='Notes'>
          {this.props.notes.map((note, index) => {
            return <div key={index} id={index}>
              <div>{note.Title}</div>
              <div>{note.Text}</div>
            </div>
          })}
        </div>
        <div className='ViewNote'>
          Note Section
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state
  }
}

export default connect(mapStateToProps)(App);
