import React from 'react';

import './AniButton.css';

handleAx = () => {
  ax.classList.toggle('change');
};

class AniButton extends React.Component {
  constructor(props) {
    super(props);
    this.state.
  }
  render() {
    return (
      <div className="container" onclick="handleAx">
        <div className="ln1" />
        <div className="ln2" />
        <div className="ln3" />
      </div>
    );
  }
}

export default AniButton;
