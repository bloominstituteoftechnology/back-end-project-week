import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { editNotes } from '../actions.js';
import { connect } from 'react-redux';

class Update extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title: props.location.state.currentNote.title,
            body: props.location.state.currentNote.body
        };
    }
    handleTextInput = e => {
        this.setState({ [e.target.name]: e.target.value});
    }
    newUpdate = async () => {
        const edited ={
            title: this.state.title,
            body: this.state.body,
            _id: this.props.location.state.currentNote._id
        }
        const pope = await this.props.editNotes(edited);
        this.props.history.push('/');

    }
    render() {
        return (
        <div className="col-9 float-right pt-5 d-flex flex-column">
            <h3 className="titleNew d-flex"> Edit Note:  </h3>
  <input 
  className="centerTitle mt-3 col-7"
  value={this.state.title}
type='text'
name="title"
placeholder="Note Title Here"
onChange={this.handleTextInput}

/>

 <input 
 className="centerText textarea mt-3"
value={this.state.body}
type='text'
name="body"
placeholder="Note body Here"
onChange={this.handleTextInput}

/>
<button onClick={() => this.newUpdate()} className="d-flex mt-3 col-2 justify-content-center tealButton" type="submit">Update</button>

    </div>
        )}
}
export default connect(null, { editNotes })(Update);