import { Field } from 'formik';
import React from 'react';
import { CustomInput } from '../common/CustomInput/CustomInput';
import styles from './CustomFormikNumberField.module.scss';

interface IProps {
  name: string;
  placeholder: string;
  label: string;
}

export const CustomFormikNumberField: React.FC<IProps> = ({
  name,
  placeholder,
  label,
}) => {
  return (
    <Field
      className={styles.numberInput}
      type='number'
      name={name}
      placeholder={placeholder}
      label={label}
      component={CustomInput}
    />
  );
};
