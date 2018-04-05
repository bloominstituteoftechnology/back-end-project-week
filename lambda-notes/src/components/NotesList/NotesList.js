import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NotesList.css'
import { getAllNotes } from '../../actions';
import { connect } from 'react-redux';

class NotesList extends Component {
  componentDidMount() {
    this.props.getAllNotes();
  }
  render() {
    console.log('NotesList props', this.props)
    return (
      <Link to={`/view/${this.props.id}`} style={{textDecoration:"none", color:"black"}}>
        <div className="Note">
          <div className="Note-Title">{this.props.note.title}</div>
          <hr />
          <div className="Note-Content">{this.props.note.content}</div>
        </div>
      </Link>
    )
  }
}


const mapStateToProps = state => {
  return {
    state: state,
  }
}

export default connect(mapStateToProps, { getAllNotes })(NotesList);