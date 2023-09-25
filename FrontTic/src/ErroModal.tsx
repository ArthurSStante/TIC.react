import React from 'react';
import './style/erroModel.css';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message }) => {
  return (
    <div className="error-modal">
      <div className="modal-content">
        <h2></h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;