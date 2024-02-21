import React, { memo } from 'react';

interface RegistrationWizardHeadProps {
  title: string;
  subTitle: string;
  titleClassName?: string;
  subTitleClassName?: string;
}

const RegistrationWizardHead = (props: RegistrationWizardHeadProps) => {
  const { title, subTitle, titleClassName, subTitleClassName } = props;

  return (
    <div className="text-center mt-40 mb-12 mb-md-0">
      <h2 className={`${titleClassName ? titleClassName : ''} fs-24`}>{title}</h2>
      <p className={`text-gray-400 ${subTitleClassName ? subTitleClassName : ''} `}>{subTitle}</p>
    </div>
  );
};

export default memo(RegistrationWizardHead);
