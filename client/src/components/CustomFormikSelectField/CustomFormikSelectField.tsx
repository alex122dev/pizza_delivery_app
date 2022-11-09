import React from 'react';
import { CustomSelect, OptionType } from '../common/CustomSelect/CustomSelect';
import styles from './CustomFormikSelectField.module.scss';

interface IProps {
    label: string;
    fieldName: string;
    initialValue: string;
    options: OptionType[];
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => void;
    startPlaceholder?: string;
}

export const CustomFormikSelectField: React.FC<IProps> = ({
    initialValue = '',
    options,
    fieldName,
    setFieldValue,
    label,
    startPlaceholder,
}) => {
    return (
        <div className={styles.selectBlock}>
            <label className={styles.selectLabel}>{label}</label>
            <CustomSelect
                startPlaceholder={startPlaceholder}
                options={options}
                selected={initialValue}
                setSelected={(v: string) => setFieldValue(fieldName, v)}
            />
        </div>
    );
};
