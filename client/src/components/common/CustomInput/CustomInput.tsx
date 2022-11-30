import cn from 'classnames';
import { FieldProps } from 'formik';
import { RefObject } from 'react';
import styles from './CustomInput.module.scss';

type CustomInpPropsType = {
  errorBlock: string;
  labelClass: string;
  allItemClass: string;
  className: string;
  label: string;
  validationInputError: string;
  innerRef: RefObject<HTMLInputElement>;
};

export const CustomInput: React.FC<CustomInpPropsType & FieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  allItemClass = styles.allItemClass, // style for all block of our custom input
  errorBlock = styles.errorBlock, // style for block with error message
  labelClass = styles.labelClass, // style for block with label
  label = 'Label text', // text inside label
  className, // input className
  validationInputError = styles.validationInputError, // style for input validation error (red outline etc.)
  innerRef, // ref
  ...props
}) => (
  <div className={allItemClass}>
    {label && <label className={labelClass}>{label}</label>}
    <input
      ref={innerRef}
      className={cn(className, {
        [styles.InputClass]: true,
        [validationInputError]: errors[field.name] && touched[field.name],
      })}
      {...field}
      {...props}
    />
    {touched[field.name] && errors[field.name] && (
      <div className={errorBlock}>{errors[field.name] as string}</div>
    )}
  </div>
);
