import React, { Component } from 'react';
import { mdReact } from 'markdown-react-js';
import DeleteView from './DeleteView';
import './markdown.css';

class NoteView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteShowing: false,
      note: {
        id: null,
        title: '',
        content: ''
      }
    };
  }

  onClickEdit = e => {
    e.preventDefault();
    window.location.href = `/edit/${this.state.note.id}`;
  }

  onClickDelete = () => {
    this.props.onDeleteNote(this.state.note.id);
  };

  onClickShowDelete = e => {
    e.preventDefault();
    document.body.style.overflow = 'hidden';
    this.setState({isDeleteShowing: true});
  };

  onClickHideDelete = () => {
    document.body.style.overflow = 'auto';
    this.setState({isDeleteShowing: false});
  };

  componentDidUpdate(prevProps) {
    let id;
    if(prevProps.notes !== this.props.notes) {
      if (this.props.match) {
        
        let notes = this.props.notes.slice();
        id = this.props.match.params.noteID;
        console.log('props don\'t match', notes, id);
        notes = notes.filter(item => item.id === id);
        if (notes[0]) {
          this.setState({ note: {
            id: notes[0].id,
            title: notes[0].title,
            content: notes[0].content
          }});
        }
      }
    }

  }

  render() {

    return (
      <main className="note-view">
        <div className="note-view-control">
          <button className="note-view-control__button" onClick={e => this.onClickEdit(e)}>edit</button>
          <button className="note-view-control__button" onClick={e => this.onClickShowDelete(e)}>delete</button>
        </div>
        <h2>{this.state.note.title}</h2>
        <span className="markdown-body">{mdReact()(this.state.note.content)}</span>
        <DeleteView isDeleteShowing={this.state.isDeleteShowing} onClickDelete={this.onClickDelete} onClickHideDelete={this.onClickHideDelete} />
      </main>
    );
  }

}

export default NoteView;