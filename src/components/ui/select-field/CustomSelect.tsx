import React from 'react';
import classNames from 'classnames';
import Select, { components, Props as SelectProps } from 'react-select';

interface CustomSelectProps {
  className?: string;
}

type ExtendedSelectProps<Option, IsMulti extends boolean> = SelectProps<Option, IsMulti> &
  CustomSelectProps;

const DropdownIndicator = () => {
  return <i className="fa-regular fa-chevron-down fs-18 text-info cursor-pointer ms-8" />;
};

const ClearIndicator = (props: any) => {
  const {
    innerProps: { ref, ...restInnerProps }
  } = props;
  return (
    <div {...restInnerProps} ref={ref}>
      <i className="fa-regular fa-xmark fs-18 text-gray-300 cursor-pointer mx-8" />
    </div>
  );
};

const CustomSelect = <Option extends object, IsMulti extends boolean = boolean>(
  props: ExtendedSelectProps<Option, IsMulti>
) => {
  const { className } = props;

  const ValueContainer = ({ children, ...props }: any) => {
    return (
      <>
        {props.hasValue && props.selectProps?.placeholder && (
          <div className="fs-12 fw-normal ms-2 mt-n2 position-absolute text-gray-300 top-10">
            {props.selectProps.placeholder}
          </div>
        )}
        {children && (
          <div
            className={classNames({
              'mt-8 mb-n8': props.hasValue && props.selectProps?.placeholder
            })}>
            <components.ValueContainer {...props}>{children}</components.ValueContainer>
          </div>
        )}
      </>
    );
  };

  return (
    <Select
      {...props}
      hideSelectedOptions={false}
      components={{ DropdownIndicator, ClearIndicator, ValueContainer }}
      classNamePrefix="react-select"
      className={classNames(`${className ?? ''} react-select-container`)}
      isSearchable={false}
      menuPlacement="auto"
    />
  );
};

export default CustomSelect;
