import React from 'react';
import './modal.css';

export const Modal = props => {
  return (
    <div className="modal-layer-one">
      <div className="modal-layer-two">
        <div className="the-modal">
          <div className="modal-text">
            {props.message}
          </div>
          <button className="modal-safe" onClick={props.turnOffError}>
            Return
          </button>
        </div>
      </div>
    </div>
  );
};
