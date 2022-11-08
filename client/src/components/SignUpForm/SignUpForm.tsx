import { Form, Formik, FormikState } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import styles from './SignUpForm.module.scss';
import { SignUpDto } from '../../dtos/auth/SignUp.dto';
import { useAppDispatch } from '../../hooks/redux';
import { signUp } from '../../stateManager/actionCreators/auth';
import { Preloader } from '../common/Preloader/Preloader';
import { phoneValidateRegExp } from '../../utils/validation/regularExpressions';
import { CustomFormikTextField } from '../CustomFormikTextField/CustomFormikTextField';
import { CustomFormikPhoneField } from '../CustomFormikPhoneField/CustomFormikPhoneField';
import { CustomFormikSendError } from '../CustomFormikSendError/CustomFormikSendError';
import { CustomFormikSendFormButton } from '../CustomFormikSendFormButton/CustomFormikSendFormButton';

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
                    <CustomFormikTextField
                        name='email'
                        label='Email'
                        placeholder='Type your email'
                    />
                    <CustomFormikTextField
                        name='password'
                        label='Password'
                        placeholder='Type your password'
                    />
                    <CustomFormikTextField
                        name='firstName'
                        label='First name'
                        placeholder='Type your first name'
                    />
                    <CustomFormikTextField
                        name='lastName'
                        label='Last name'
                        placeholder='Type your last name'
                    />
                    <CustomFormikPhoneField setFieldValue={setFieldValue} />
                    {formSendError && (
                        <CustomFormikSendError message={formSendError} />
                    )}
                    <CustomFormikSendFormButton
                        text='Sign Up'
                        isSubmitting={isSubmitting}
                        className={styles.sendBtn}
                    />
                </Form>
            )}
        </Formik>
    );
};
