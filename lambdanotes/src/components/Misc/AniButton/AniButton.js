import React from 'react';

import './AniButton.css';

class AniButton extends React.Component {
  render() {
    return (
      <button className="container" onMouseDown={this.props.handleMouseDown}>
        <div className="ln1" />
        <div className="ln2" />
        <div className="ln3" />
      </button>
    );
  }
}

export default AniButton;
