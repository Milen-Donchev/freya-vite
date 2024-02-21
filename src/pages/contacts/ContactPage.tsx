import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import map from 'lodash/map';
import type { Image } from '@types';
import { useTranslation } from '@hooks/useTranslation';
import { getImage } from '@utils';
import { CardFrame } from '@components';
import contactImage from './contacts.svg';
import { contactImg } from './contacts.scss';

type Contact = {
  title: string;
  number?: string;
  description?: string;
};

type ContactsData = {
  title: string;
  contacts: Contact[];
  image?: Image;
};

const ContactPage = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((store: any) => store.currentUserSlice.currentUser);

  const data: ContactsData = {
    title: t('contact.title', 'Registry office'),
    contacts: [
      {
        title: t('contact.title_first', 'First title'),
        number: t('contact.number_first', 'First number'),
        description: t('contact.description_first', 'First description')
      },
      {
        title: t('contact.title_second', 'Second title'),
        number: t('contact.number_second', 'Second number'),
        description: t('contact.description_second', 'Second description')
      },
      {
        title: t('contact.title_third', 'Third title'),
        number: t('contact.number_third', 'Third number'),
        description: t('contact.description_third', 'Third description')
      }
    ]
  };

  return (
    <CardFrame
      className={classNames('mb-32 p-20 p-lg-40 shadow-sm', {
        'mt-48 mx-16 mx-sm-48': !currentUser
      })}>
      <div className="row row-cols-1 row-cols-lg-3 gap-32">
        <div className="col">
          <p className="fs-24 fw-semibold mb-32">{data.title}</p>
          <img
            src={data.image ? getImage(data.image) : contactImage}
            className={`${contactImg} img-fluid`}
          />
        </div>
        <div className="col d-flex flex-column gap-24">
          {map(data.contacts, (contact: Contact, index) => (
            <div key={index}>
              <p className="fw-bold mb-0">{contact.title}</p>
              <p className="text-quarterly">{contact.number}</p>
              {contact.description && <p className="fs-14">{contact.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </CardFrame>
  );
};

export default ContactPage;
