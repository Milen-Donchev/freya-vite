import React from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import { useTranslation } from '@hooks/useTranslation';

export interface ConfirmationPopupProps extends ModalProps {
  onConfirm: () => void;
  closeButton?: boolean;
}

export const ConfirmationPopup = (props: ConfirmationPopupProps) => {
  const { title, body, onConfirm, onHide, closeButton = true, ...rest } = props;
  const { t } = useTranslation();

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered onHide={onHide} {...rest}>
      <Modal.Header closeButton={closeButton} className="pb-32">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-40 py-0">{body}</Modal.Body>
      <Modal.Footer className="d-flex gap-20 flex-wrap m-40">
        <button className="btn btn-lg btn-outline-primary width-100 width-sm-auto" onClick={onHide}>
          {t('common.Cancel', 'Cancel')}
        </button>
        <button
          className="btn btn-lg btn-primary width-100 width-sm-auto"
          onClick={onConfirm}
          data-testid="confirmation-popup-confirm-btn">
          {t('common.confirm', 'Confirm')}
        </button>
      </Modal.Footer>
    </Modal>
  );
};
