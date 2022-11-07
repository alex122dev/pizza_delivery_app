import { Field } from 'formik';
import React from 'react';
import { phoneNumberMask } from '../../utils/masks/phoneNumberMask';
import { CustomInput } from '../common/CustomInput/CustomInput';

interface IProps {
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => void;
}

export const CustomFormikPhoneField: React.FC<IProps> = ({ setFieldValue }) => {
    return (
        <Field
            type='tel'
            name='phone'
            placeholder='+38 (095) 644-64-64'
            maxLength={19}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                phoneNumberMask(e, setFieldValue)
            }
            label='Phone'
            component={CustomInput}
        />
    );
};
