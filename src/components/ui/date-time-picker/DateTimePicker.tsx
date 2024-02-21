import React, { ForwardedRef, forwardRef, ReactNode } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import bgLocale from 'date-fns/locale/bg';

import { useLocale } from '@hooks/useLocale';

import 'react-datepicker/dist/react-datepicker.css';

interface DateTimePickerProps {
  mode: 'date' | 'time';
  startDate: Date;
  setStartDate: (date: Date) => void;
  setDate?: (date: Date) => void;
  isDisabled?: boolean;
  label?: ReactNode | string;
  className?: string;
  showCustomInput?: boolean;
  customInputTitle?: string;
  showInPortal?: boolean;
}

registerLocale('bg', bgLocale);

const DateTimePicker = (props: DateTimePickerProps) => {
  const {
    mode,
    label,
    startDate,
    setStartDate,
    className,
    isDisabled = false,
    showCustomInput = false,
    customInputTitle,
    showInPortal = false
  } = props;
  const { locale } = useLocale();

  const isDateMode = mode === 'date';

  const handleChange = (date: Date) => {
    setStartDate(date);
  };

  const CustomInput = forwardRef(
    (
      props: React.ButtonHTMLAttributes<HTMLButtonElement>,
      ref: ForwardedRef<HTMLButtonElement>
    ) => (
      <button
        {...props}
        data-testid="datetime-picker-custom-input"
        className="fs-12 fs-md-14 d-flex align-items-center bg-transparent border-0 text-primary"
        ref={ref}>
        <i className="fa-light fa-calendar ps-8 pe-8 fs-18" />
        {customInputTitle}
      </button>
    )
  );

  return (
    <div className={`${className} mb-2`}>
      {label && <label className="pb-1 w-100">{label}</label>}
      <DatePicker
        data-testid="datetime-picker"
        dateFormat={isDateMode ? 'yyyy/MM/dd ' : 'HH:mm'}
        locale={locale}
        className={`mb-2 form-control reactDateTimePicker text-end border-0 shadow-none text-primary`}
        disabled={isDisabled}
        wrapperClassName="my-react-date-time-calendar"
        selected={startDate}
        withPortal={showInPortal}
        minDate={new Date()}
        onChange={(date: Date) => handleChange(date)}
        showTimeInput={!isDateMode}
        showTimeSelectOnly={!isDateMode}
        customInput={showCustomInput ? <CustomInput /> : null}
      />
    </div>
  );
};

export default DateTimePicker;
