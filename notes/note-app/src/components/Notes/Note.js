import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { reduxForm, Field } from 'redux-form';

import { editNote, deleteNote } from '../../actions';

// import NoteTitle from './NoteTitle';
// import NoteText from './NoteText';

// import '../../styles/css/index.css';

class Note extends Component {
  state = {
    id: -1,
    title: '',
    content: '',
  };

  componentDidMount() {
    this.setState({
      id: this.props.note._id,
      title: this.props.note.title,
      content: this.props.note.content,
    });
  }

  // componentWillReceiveProps(nextProps) {
  // 	console.log(nextProps.note);
  // 	if (
  // 		nextProps.note.title !== this.state.title ||
  // 		nextProps.note.text !== this.state.text
  // 	) {
  // 		this.setState({ title: nextProps.note.title, text: nextProps.note.text });
  // 	}
  // 	console.log(this.state);
  // }

  editTitle = editedTitle => {
    if (!this.props.isViewingSingleNote)
      this.props.editNote({ ...this.state, title: editedTitle });

    this.setState({ title: editedTitle });
  };

  editText = editedText => {
    if (!this.props.isViewingSingleNote)
      this.props.editNote({ ...this.state, text: editedText });

    this.setState({ text: editedText });
  };

  deleteNoteButtonClickedHandler = _ => {
    this.props.deleteNote(this.state.id);
  };

  confirmEditButtonClickedHandler = _ => {
    this.props.editNote({ ...this.state });
    this.props.returnToAllNotes();
  };

  cancelEditSingleNoteButtonClickHandler = _ => {
    // this.props.editNote({
    // 	...this.state,
    // 	title: this.props.note.title,
    // 	text: this.props.note.text,
    // });
    // this.props.returnToAllNotes();
  };
  /*



				{this.props.isViewingSingleNote ? (
					<div
						className="SingleNoteViewButtons"
						onClick={this.cancelEditSingleNoteButtonClickHandler}
					>
						cancel edit
					</div>
				) : null}
				*/
  // {/* style={
  // 	// this.props.isViewingSingleNote
  // 	//   ? this.props.colorClicked === null
  // 	//     ? { width: '100%%' }
  // 	//     : { background: `${this.props.colorClicked}`, width: '100%' }
  // 	//   : null
  // } */}

  render() {
    return (
      <div className="Note">
        <div className="NoteTitle">{this.state.title}</div>

        <div className="NoteContent">{this.state.content}</div>

        {/* <NoteTitle
          title={this.props.note.title}
          editTitleHandler={this.editTitle}
        />

        <NoteText
          text={this.props.note.content}
          editTextHandler={this.editText}
          style={
            this.props.colorClicked === null
              ? null
              : { setBackgroundColor: `${this.props.colorClicked}` }
          }
        /> */}

        {/* {this.props.isViewingSingleNote ? (
          <div
            className="SingleNoteViewButtons"
            onClick={this.confirmEditButtonClickedHandler}
          >
            confirm edit
          </div>
        ) : null} */}

        {/* {this.props.isViewingSingleNote ? (
          <div
            className="SingleNoteViewButtons"
            onClick={this.cancelEditSingleNoteButtonClickHandler}
            style={{
              background: 'white',
              color: 'black',
              opacity: '0.2',
              cursor: 'not-allowed',
            }}
          >
            cancel edit
          </div>
        ) : null} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //
  };
};

export default connect(mapStateToProps, { editNote, deleteNote })(Note);
