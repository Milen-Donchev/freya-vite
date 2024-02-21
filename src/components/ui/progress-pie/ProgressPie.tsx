import React from 'react';

interface ProgressPieProps {
  title: string;
  currentStep: number;
  allSteps: number;
}

const ProgressPie = (props: ProgressPieProps) => {
  const { title, currentStep, allSteps } = props;

  return (
    <div className="width-5 height-5 rounded-circle bg-secondary-300">
      <div
        className="width-5 height-5 rounded-circle d-flex align-items-center justify-content-center"
        style={{
          background: `conic-gradient(var(--bs-secondary) ${
            (currentStep / allSteps) * 360
          }deg, transparent 0)`
        }}>
        <div className="width-3 height-3 bg-white rounded-circle d-flex justify-content-center align-items-center fs-14 fw-bold">
          {title}
        </div>
      </div>
    </div>
  );
};

export default ProgressPie;
