import cn from 'classnames';
import { FieldProps } from 'formik';

type CustomInpPropsType = {
    errorBlock: string;
    labelClass: string;
    allItemClass: string;
    className: string;
    label: string;
    validationInputError: string;
};

export const CustomInput: React.FC<CustomInpPropsType & FieldProps> = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    allItemClass, // style for all block of our custom input
    errorBlock, // style for block with error message
    labelClass, // style for block with label
    label, // text inside label
    className, // input className
    validationInputError, // style for input validation error (red outline etc.)
    ...props
}) => (
    <div className={allItemClass}>
        {label && <label className={labelClass}>{label}</label>}
        <input
            className={cn(className, {
                [validationInputError]:
                    errors[field.name] && touched[field.name],
            })}
            {...field}
            {...props}
        />
        {touched[field.name] && errors[field.name] && (
            <div className={errorBlock}>{errors[field.name] as string}</div>
        )}
    </div>
);
