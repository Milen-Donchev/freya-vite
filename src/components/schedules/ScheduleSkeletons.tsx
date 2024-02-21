import React from 'react';
import Skeleton from 'react-loading-skeleton';

const MeetingSkeleton = () => (
  <div className="col-12 col-lg-8">
    <div className="bg-white rounded-4 p-20 p-lg-40">
      <Skeleton height={30} width={150} />
      <div>
        <div className="d-flex flex-wrap flex-xl-nowrap justify-content-between">
          <div className="col-12 col-xl-6">
            <p className="mb-12 fw-bold">
              <Skeleton width={250} />
            </p>
            <div className="d-flex justify-content-between p-20 border border-2 border-gray-200 rounded-4">
              <div>
                <p className="mb-8">
                  <Skeleton width={100} />
                </p>
                <p className="mb-8">
                  <Skeleton width={100} />
                </p>
                <p className="mb-8">
                  <Skeleton width={100} />
                </p>
                <p className="mb-8">
                  <Skeleton width={100} />
                </p>
              </div>
              <i className="fs-24 fa-light fa-pen-to-square text-gray-300" />
            </div>
          </div>
          <div className="col-12 col-xl-6 ps-xl-12 mt-20">
            <Skeleton className="form-floating width-100" height={250} borderRadius={10} />
          </div>
        </div>
        <div className="d-flex justify-content-end mt-auto width-100 pt-20">
          <button className="btn btn-gray-200">
            <Skeleton width={100} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const CardFrameSkeleton = () => (
  <div className="col-12 col-lg-4">
    <div className="bg-white rounded-4">
      <ProfileCardSkeleton />
      <div className="p-24">
        <div className="d-flex justify-content-start align-items-center">
          <Skeleton width={50} height={50} circle={true} />
          <Skeleton className="ms-12" width={150} />
        </div>
        <Skeleton className="mt-40 mb-8" width={100} height={20} />
        <div className="d-flex justify-content-start align-items-center">
          <Skeleton width={50} height={50} circle={true} />
          <Skeleton className="ms-12" width={150} />
        </div>
        <div className="d-flex mt-12 justify-content-start align-items-center">
          <Skeleton width={50} height={50} circle={true} />
          <Skeleton className="ms-12" width={150} />
        </div>
        <div className="d-flex mt-12 justify-content-start align-items-center">
          <Skeleton width={50} height={50} circle={true} />
          <Skeleton className="ms-12" width={150} />
        </div>
      </div>
    </div>
  </div>
);

const ProfileCardSkeleton = () => (
  <div className="d-flex justify-content-start align-items-center flex-wrap p-20 bg-quarterly-200 rounded-4">
    <Skeleton height={80} width={80} circle={true} />
    <div className="ps-12">
      <Skeleton count={2} width={100} />
    </div>
  </div>
);

export { MeetingSkeleton, CardFrameSkeleton, ProfileCardSkeleton };
