import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './css/delete.css';

export default class DeleteNote extends Component {
  constructor(props){
    super(props);
    this.state = {
      note: this.props.note,
    }
  }

  deleteHandler = (e) => {
    this.props.deleteNote(this.state.note.id);
    this.props.disableDelete();
    console.log('this.props.note ==>',this.props.note);
  }

  render() {
    return (
      <div className="deletenote">
        <div className="inner-div">
          <h4>Are you sure you want to delete this?</h4>
          <div className='delete-buttons'>
            <Link
              id="delete"
              className="button"
              to="/listnotes/"
              onClick={this.deleteHandler}
            >Delete</Link>
            <Link
              id="no"
              className="button"
              onClick={() => this.props.disableDelete()}
              to={`/listnotes/${this.state.note.id}`}
            >No</Link>
          </div>
        </div>
      </div>
    );
  }
}
