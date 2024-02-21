import React from 'react';
import map from 'lodash/map';

import CardFrame from '../ui/frames/CardFrame';

interface ProfileSubscriptionsHistoryListProps {}

const ProfileSubscriptionsHistoryList = (props: ProfileSubscriptionsHistoryListProps) => {
  return (
    <CardFrame className="p-20 mt-20 p-lg-28 mt-lg-28">
      <div className="fs-sm-24 fs-18 mb-28 fw-semibold">История на плащанията</div>
      <div className="d-flex flex-column gap-12">
        {map(dummy_data, ({ id, title, date, price }) => (
          <div
            className="d-flex flex-column flex-lg-row gap-16 border border-primary-300 p-16 rounded-3 position-relative"
            key={String(id)}>
            <div className="col-auto m-auto">
              <div className="d-flex justify-content-center align-items-center align-self-center rounded-circle bg-primary-200 width-5 height-5 flex-shrink-0">
                <i className="fa-light fa-file-invoice-dollar fs-18 text-primary-600" />
              </div>
            </div>
            <div className="col-12 col-lg-5 col-xl-4 d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-16 gap-lg-24">
              <div>
                <p className="fw-semibold mb-0">{title}</p>
                <p className="position-absolute top-0 start-1 mt-16 mt-lg-0 position-lg-relative fs-12 text-gray-300 mb-0">
                  {date}
                </p>
              </div>
              <div className="d-flex align-items-center d-lg-block">
                <p className="fs-12 me-8 me-lg-0 text-gray-300 mb-0">сума</p>
                <p className="fw-bold mb-0">{price}</p>
              </div>
            </div>
            <div className="col align-self-center text-end">
              <button className="btn btn-outline-primary btn-lg">Изтеглете</button>
            </div>
          </div>
        ))}
      </div>
    </CardFrame>
  );
};

export default ProfileSubscriptionsHistoryList;

const dummy_data = [
  {
    id: 1,
    title: 'План 2: Група за въпроси',
    date: '28.12.2022',
    price: '80лв',
    downloadLink: 'some-link'
  },
  {
    id: 2,
    title: 'План 2: Група за въпроси',
    date: '28.12.2022',
    price: '80лв',
    downloadLink: 'some-link'
  },
  {
    id: 3,
    title: 'План 2: Група за въпроси',
    date: '28.12.2022',
    price: '80лв',
    downloadLink: 'some-link'
  },
  {
    id: 4,
    title: 'План 2: Група за въпроси',
    date: '28.12.2022',
    price: '80лв',
    downloadLink: 'some-link'
  },
  {
    id: 5,
    title: 'План 2: Група за въпроси',
    date: '28.12.2022',
    price: '80лв',
    downloadLink: 'some-link'
  }
];
