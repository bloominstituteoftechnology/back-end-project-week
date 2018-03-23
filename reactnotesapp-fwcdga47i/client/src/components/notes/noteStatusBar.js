import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteNote } from '../../actions';

class NoteStatusBar extends Component {
  state = {
    id: -1,
    viewing: false,
  };

  componentDidMount() {
    this.setState({ id: this.props.id });
  }

  deleteButtonClickedHandler = _ => {
    this.props.deleteNote(this.state.id);
  };

  viewButtonClickedHandler = _ => {
    if (this.state.viewing) {
      this.setState({ viewing: false });
      this.props.restoreNotes();
      return;
    }

    this.setState({ viewing: true });
    this.props.filterNotes(this.state.id);
  };

  render() {
    return (
      <div className="NoteStatusBar">
        <div className="DeleteButton" onClick={this.deleteButtonClickedHandler}>
          &#x2715;
        </div>

        <div className="ViewButton" onClick={this.viewButtonClickedHandler}>
          &#171;
        </div>
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
