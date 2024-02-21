import React from 'react';
import { Modal, ModalProps } from 'react-bootstrap';
import classNames from 'classnames';
import defaultImage from './marketing-poup.svg';
import { marketingPopup } from './popup.scss';

export interface MarketingPopupProps extends ModalProps {
  closeButton?: boolean;
}

export const MarketingPopup = (props: MarketingPopupProps) => {
  const { image, title, body, closeButton = true, ...rest } = props;

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      {...rest}
      contentClassName="overflow-hidden">
      <div className="d-flex flex-wrap flex-md-nowrap">
        <div className={classNames('position-relative flex-shrink-0', marketingPopup)}>
          <img
            src={image ?? defaultImage}
            className="width-100 height-100 object-fit-cover position-absolute rounded-4"
          />
        </div>
        <div className="flex-fill">
          <Modal.Header
            closeButton={closeButton}
            className="position-absolute position-md-relative p-20 top-0 end-0">
            {title}
          </Modal.Header>
          <Modal.Body className="p-40 pt-md-20">{body}</Modal.Body>
        </div>
      </div>
    </Modal>
  );
};
