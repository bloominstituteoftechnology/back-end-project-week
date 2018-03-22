import React from 'react';

import Menu from '../../Menu/Menu';
import './AniButton.css';

class AniButton extends React.Component {
  render() {
    return (
      <button className="btn2" onMouseDown={this.props.handleMouseDown}>
        <div className="ln1" />
        <div className="ln2" />
        <div className="ln3" />
      </button>
    );
  }
}

export default AniButton;
