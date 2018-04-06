import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { toggle_check } from '../actions/index';

import './css/CheckItem.css';

const ROUTE = 'https://pure-sands-16313.herokuapp.com/notes/';

class CheckItem extends React.Component {
  render() {
    return (
      <div className="check-item">
        {this.props.check.checked ? (
          <input type="checkbox" defaultChecked onClick={this.toggleCheck} />
        ) : (
          <input type="checkbox" onClick={this.toggleCheck} />
        )}
        {this.props.check.note}
      </div>
    );
  }
  toggleCheck = () => {
    const updated = this.props.note;
    updated.checklist[this.props.check.index].checked = !updated.checklist[this.props.check.index]
      .checked;

    axios
      .put(`${ROUTE}${this.props.user}/${this.props.note._id}`, {
        checklist: this.props.note.checklist,
      })
      .then(() => {
        this.props.toggle_check(updated);
      })
      .catch((error) => {
        alert('Error Editing Check List.');
      });
  };
}

const mapPropsToState = (state) => {
  return {
    note: state.note,
    user: state.currentUser,
  };
};

export default connect(mapPropsToState, { toggle_check })(CheckItem);
