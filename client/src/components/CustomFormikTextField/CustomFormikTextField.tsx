import { Field } from 'formik';
import React from 'react';
import { CustomInput } from '../common/CustomInput/CustomInput';

interface IProps {
  name: string;
  placeholder: string;
  label: string;
}

export const CustomFormikTextField: React.FC<IProps> = ({
  name,
  placeholder,
  label,
}) => {
  return (
    <Field
      type='text'
      name={name}
      placeholder={placeholder}
      label={label}
      component={CustomInput}
    />
  );
};
