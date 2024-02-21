import React from 'react';
import { Modal, ModalProps } from 'react-bootstrap';

export interface PopupProps extends ModalProps {
  closeButton?: boolean;
}

export const Popup = (props: PopupProps) => {
  const { title, body, footer, closeButton = true, ...rest } = props;

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered {...rest}>
      <Modal.Header closeButton={closeButton} className="pb-32">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-40 py-0">{body}</Modal.Body>
      <Modal.Footer className={`${footer ? 'm-40' : 'm-20'}`}>{footer}</Modal.Footer>
    </Modal>
  );
};
