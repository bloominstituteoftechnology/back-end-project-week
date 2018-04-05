import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Login.css';
import { NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import { addNote } from '../actions'


class CreateNote extends Component {
  state = {
    username: '',
    password: ''
  };
  render() {
    return (
      <div className="Home__Right">
        <div className="Right__Containers">
          <div className="CreateNote__Text">
            Login / Register:
          </div>
          <div className="CreateNote__Title">
            <textarea
            name="username"
            placeholder="Username"
            value={this.state.username}
            rows="1"
            cols="20"
            onChange={this.doChange}
            />
          </div>
          <div className="CreateNote__Content">
            <textarea
            name="password"
            placeholder="Password"
            value={this.state.password}
            rows="1"
            cols="20"
            onChange={this.doChange}
            />
          </div>
          <NavLink activeClassName='NavButton' to='/viewnotes'>
            <div className="button CreateNote__Save" onClick={this.doSubmit}>
              <b>Log In</b>
            </div>
          </NavLink>
          <NavLink activeClassName='NavButton' to='/viewnotes'>
            <div className="button CreateNote__Save" onClick={this.doSubmit}>
              <b>Register</b>
            </div>
          </NavLink>
        </div>
      </div>
    )
  }

  doChange = (event) => { // event is that current form (textarea)
    event.preventDefault(); // stop default action of component
    this.setState(
      { [event.target.name]: event.target.value } // like Object.assign..
    )  // adds the event.target.name (eg: title) property of the state to equal the new value
       // this doesn't overwrite state, but overwrites the specified [] value
  }
  doSubmit = (event) => {
    console.log('created note');
    this.props.addNote(this.state);
    this.setState( // reset the state
      { title: '', meat: '', redirect: true, }
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state
  };
};

export default connect(mapStateToProps, { addNote })(CreateNote);
