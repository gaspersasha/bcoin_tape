import React from 'react'
import PropTypes from 'prop-types';

export const Modal = ({ onClose, children }) => {
  return (
    <>
      <div className="mantle" onClick={onClose}></div>
      <div className="modal">
        <div className="modal-exit"><span onClick={onClose}>Х</span></div>
        {children}
      </div>
    </>
  )
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;