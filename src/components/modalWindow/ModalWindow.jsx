import React, { useContext } from 'react';
import { ModalContext } from '../../context/ModalContext';
import './ModalWindow.less';

const ModalWindow = ({ children, type }) => {
  const { closeModal } = useContext(ModalContext);
  return (
    <section className="overlay" onClick={() => { return closeModal(type); }}>
      <div className="modal-window" onClick={(e) => { return e.stopPropagation(); }}>
        {children}
      </div>
    </section>
  );
};

export default ModalWindow;