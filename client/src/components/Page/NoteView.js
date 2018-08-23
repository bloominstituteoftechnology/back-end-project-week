import React, { Component } from 'react';
import { mdReact } from 'markdown-react-js';
import ReactDropzone from "react-dropzone";
import request from "superagent";
import DeleteView from './DeleteView';
import firebase from '../../firebase';
import './markdown.css';

class NoteView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeleteShowing: false,
      note: {
        id: null,
        title: '',
        content: '',
        files: []
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

  onDrop = file => {
    file = file[0];
    console.log('file', file);
    let storageRef = firebase.storage().ref();
    const name = `${Date.now()}-${Math.floor(Math.random()*100000)}-${file.name}`;
    let metadata = {
      'contentType': file.type
    };
    console.log('metadata', metadata);
    storageRef.child('notes/' + name).put(file, metadata).then(snapshot => {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      snapshot.ref.getDownloadURL().then(url => {
        console.log('File available at', url);
        const newFiles = this.state.note.files;
        newFiles.push(url);
        this.setState({note: {
          id: this.state.note.id,
          title: this.state.note.title,
          content: this.state.note.content,
          files: newFiles
        }});
        this.props.onAddImage(this.state.note);
      });
    }).catch(e => {
      console.error('Upload failed:', e);
    });
  }

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
            content: notes[0].content,
            files: notes[0].files || []
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
        {this.state.note.files.map(file => {
          return <img className="note-image" src={file} />
        })}
        <ReactDropzone className="drop-area" activeClassName="drop-area--active" onDrop={this.onDrop}>
          Add an image
        </ReactDropzone>
        <DeleteView isDeleteShowing={this.state.isDeleteShowing} onClickDelete={this.onClickDelete} onClickHideDelete={this.onClickHideDelete} />
      </main>
    );
  }

}

export default NoteView;