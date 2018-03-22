import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteNote } from '../../actions';

class NoteStatusBar extends Component {
  deleteButtonClickedHandler = _ => {
    this.props.deleteNote(this.props.id);
  };

  render() {
    return (
      <div className="NoteStatusBar">
        <div className="DeleteButton" onClick={this.deleteButtonClickedHandler}>
          &#x2715;
        </div>

        <div className="ViewButton">&#xBB;</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    //
  };
};

export default connect(mapStateToProps, { deleteNote })(NoteStatusBar);
