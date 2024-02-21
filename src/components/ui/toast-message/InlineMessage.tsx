import React from 'react';
import { ToastOptions, toast } from 'react-toastify';
import isObject from 'lodash/isObject';
import classNames from 'classnames';

import { KeyString } from '@freya/types';
import { useTranslatedAttribute } from '@hooks/useTranslatedAttribute';

type MessageType = 'danger' | 'info' | 'warning' | 'success';

interface InlineMessageProps {
  message: string | KeyString;
  type?: MessageType;
  closeToast?: () => {};
  size?: 'small' | 'default';
}

const IconType = {
  danger: 'fa-circle-xmark',
  info: 'fa-circle-xmark',
  warning: 'fa-triangle-exclamation',
  success: 'fa-circle-check'
};

const InlineMessage = (props: InlineMessageProps) => {
  const { type = 'info', message, closeToast, size = 'default' } = props;
  const translate = useTranslatedAttribute();

  return (
    <div
      className={`d-flex bg-${type}-200 rounded-2 shadow-sm border border-${type}-300 overflow-hidden`}
      data-testid="inline-message">
      <div
        className={classNames(
          `d-flex align-items-center flex-shrink-0 bg-${type}-300 rounded-start-2`,
          {
            'p-16': size === 'default',
            'p-8': size === 'small'
          }
        )}>
        <i
          className={classNames(`fa-light ${IconType[type]} text-${type}-600`, {
            'fs-24': size === 'default',
            'fs-22': size === 'small'
          })}></i>
      </div>
      <div
        className={classNames(
          'd-flex align-items-center fs-14 fw-semibold width-100 text-gray-500',
          {
            'px-16 py-24': size === 'default',
            'px-16 py-8': size === 'small'
          }
        )}
        data-testid="inline-message-content">
        {isObject(message) ? translate(message) : message}
      </div>
      {closeToast && (
        <div
          className="bg-white d-flex align-items-center justify-content-center px-12 cursor-pointer"
          onClick={closeToast}>
          <i className="fa-light fa-circle-xmark fs-24 text-info"></i>
        </div>
      )}
    </div>
  );
};

export default InlineMessage;

export const toastMessage = (
  message: string | KeyString,
  type: MessageType = 'info',
  options?: ToastOptions
) => {
  toast(<InlineMessage type={type} message={message} />, options);
};
