import React from 'react';
import ReactModal from 'react-modal';
import { ClassNames } from '@emotion/core';

import Paper from '../Paper';

interface ModalProps {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
  <ClassNames>
    {({ css }) => (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        overlayClassName={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
        `}
        className={css`
          position: absolute;
          display: inline-block;
          width: 40rem;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          outline: 0;
        `}
      >
        <Paper>
          {children}
        </Paper>
      </ReactModal>
    )}
  </ClassNames>
);

export default Modal;
