import { FieldProps } from 'formik';
import React from 'react';
import styles from './CustomFormikCheckboxField.module.scss';

interface IProps {
    name: string;
    label: string;
}

export const CustomFormikCheckboxField: React.FC<IProps & FieldProps> = ({
    form: { touched, errors },
    field,
    name,
    label,
    ...props
}) => {
    return (
        <div className={styles.checkbox}>
            <input
                id='formCheckbox'
                type='checkbox'
                {...field}
                {...props}
                className={styles.checkboxInput}
            />
            <label htmlFor='formCheckbox' className={styles.checkboxLabel}>
                <span>{label}</span>
                <span className={styles.slider}></span>
            </label>
        </div>
    );
};
