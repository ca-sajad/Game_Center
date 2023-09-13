import React from 'react';
import Modal from 'react-modal';

const YesNoModal = ({ isOpen, onRequestClose, onYesClick, onNoClick }) => {
  return (
    <Modal
        className="modal yes-no-modal"
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Yes/No Modal"
    >
      <div >
        <p>You will lose the game.<br/> Do you want to proceed?</p>
        <div className="flex justify-between mt-4 text-2xl">
          <button className="modal-btn" onClick={onYesClick}>Yes</button>
          <button className="modal-btn" onClick={onNoClick}>No</button>
        </div>
      </div>
    </Modal>
  );
};

export default YesNoModal;