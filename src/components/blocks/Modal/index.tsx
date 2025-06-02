import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
};

export const Modal: React.FC<Props> = ({ isOpen, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.dataset.modal = 'open';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalRoot = document.body;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-window">{children}</div>
    </div>,
    modalRoot,
  );
};
