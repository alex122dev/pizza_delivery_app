import { FieldProps } from 'formik';
import React from 'react';
import styles from './CustomFormikCheckboxField.module.scss';

interface IProps {
  name: string;
  label: string;
  uniqueId: string;
}

export const CustomFormikCheckboxField: React.FC<IProps & FieldProps> = ({
  form: { touched, errors },
  field,
  name,
  label,
  uniqueId,
  ...props
}) => {
  return (
    <div className={styles.checkbox}>
      <input
        id={uniqueId}
        type='checkbox'
        {...field}
        {...props}
        className={styles.checkboxInput}
      />
      <label htmlFor={uniqueId} className={styles.checkboxLabel}>
        <span>{label}</span>
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
