import { Field, Form, Formik, FormikState } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import styles from './SignUpForm.module.scss';
import { SignUpDto } from '../../dtos/auth/SignUp.dto';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { CustomInput } from '../common/CustomInput/CustomInput';
import { useAppDispatch } from '../../hooks/redux';
import { signUp } from '../../stateManager/actionCreators/auth';
import { Preloader } from '../common/Preloader/Preloader';
import { phoneValidateRegExp } from '../../utils/validation/regularExpressions';
import { phoneNumberMask } from '../../utils/masks/phoneNumberMask';

interface IProps {}

export const SignUpForm: React.FC<IProps> = ({}) => {
    const dispatch = useAppDispatch();
    const [formSendError, setFormSendError] = useState('');

    const formInitialValues: SignUpDto = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
    };

    const onFormSubmit = async (
        values: SignUpDto,
        {
            resetForm,
        }: { resetForm: (nextState?: Partial<FormikState<SignUpDto>>) => void },
    ): Promise<void> => {
        try {
            setFormSendError('');
            const sendData: SignUpDto = {
                ...values,
                phone: values.phone.replace(/\D/g, ''),
            };
            await dispatch(signUp(sendData));
            resetForm();
        } catch (e: any) {
            setFormSendError(e.response?.data?.message);
        }
    };

    const validationSchemaObject = Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required().min(6).max(100),
        firstName: Yup.string().required(),
        lastName: Yup.string().required(),
        phone: Yup.string()
            .required()
            .matches(phoneValidateRegExp, 'The phone number is invalid'),
    });

    const renderTextField = (
        name: string,
        placeholder: string,
        label: string,
    ) => {
        return (
            <Field
                type='text'
                name={name}
                placeholder={placeholder}
                allItemClass={styles.item}
                label={label}
                component={CustomInput}
            />
        );
    };

    const renderPhoneField = (
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean,
        ) => void,
    ) => {
        return (
            <Field
                type='tel'
                name='phone'
                placeholder='+38 (095) 644-64-64'
                maxLength={19}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    phoneNumberMask(e, setFieldValue)
                }
                allItemClass={styles.item}
                label='Phone'
                component={CustomInput}
            />
        );
    };

    const renderFormSendErrorBlock = () => {
        return (
            formSendError && (
                <p className={styles.errMessage}>
                    Try again, please. Some error occured: {formSendError}
                </p>
            )
        );
    };

    const renderSendButton = (isSubmitting: boolean) => {
        return (
            <CustomButton
                type='submit'
                startColor='green'
                disabled={isSubmitting}
                className={styles.sendBtn}
            >
                Sign Up
            </CustomButton>
        );
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={formInitialValues}
            onSubmit={onFormSubmit}
            validationSchema={validationSchemaObject}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className={styles.formBody}>
                    {isSubmitting && <Preloader className={styles.preloader} />}
                    {renderTextField('email', 'Type your email', 'Email')}
                    {renderTextField(
                        'password',
                        'Type your password',
                        'Password',
                    )}
                    {renderTextField(
                        'firstName',
                        'Type your first name',
                        'First name',
                    )}
                    {renderTextField(
                        'lastName',
                        'Type your last name',
                        'Last name',
                    )}
                    {renderPhoneField(setFieldValue)}
                    {renderFormSendErrorBlock()}
                    {renderSendButton(isSubmitting)}
                </Form>
            )}
        </Formik>
    );
};
