/* eslint-disable */

import React from 'react';

class ViewNote extends React.Component {
  render() {
    return (
      <div>
        {this.props.location.note.title}
        <div>{this.props.location.note.message}</div>
      </div>
    );
  }
}

export default ViewNote;
