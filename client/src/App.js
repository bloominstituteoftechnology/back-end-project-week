import React, { Component } from 'react';
import './App.css';
import SideBar from './components/sideBar';
import { viewNote } from './actions';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.viewNote();
  }
  render() {
    return (
      <div className="App">
        <SideBar notes={this.props.notes} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes,
  };
};

export default connect(mapStateToProps, { viewNote })(App);
