import { Form, Formik, FormikState } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import styles from './SignInForm.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { signIn } from '../../stateManager/actionCreators/auth';
import { SignInDto } from '../../dtos/auth/SignIn.dto';
import { Preloader } from '../common/Preloader/Preloader';
import { CustomFormikTextField } from '../CustomFormikTextField/CustomFormikTextField';
import { CustomFormikSendError } from '../CustomFormikSendError/CustomFormikSendError';
import { CustomFormikSendFormButton } from '../CustomFormikSendFormButton/CustomFormikSendFormButton';

interface IProps {}

export const SignInForm: React.FC<IProps> = ({}) => {
    const dispatch = useAppDispatch();
    const [formSendError, setFormSendError] = useState('');

    const formInitialValues: SignInDto = {
        email: '',
        password: '',
    };

    const onFormSubmit = async (
        values: SignInDto,
        {
            resetForm,
        }: { resetForm: (nextState?: Partial<FormikState<SignInDto>>) => void },
    ): Promise<void> => {
        try {
            setFormSendError('');
            await dispatch(signIn(values));
            resetForm();
        } catch (e: any) {
            setFormSendError(e.response?.data?.message);
        }
    };

    const validationSchemaObject = Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required().min(6).max(100),
    });

    return (
        <Formik
            enableReinitialize={true}
            initialValues={formInitialValues}
            onSubmit={onFormSubmit}
            validationSchema={validationSchemaObject}
        >
            {({ isSubmitting }) => (
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
                    {formSendError && (
                        <CustomFormikSendError message={formSendError} />
                    )}
                    <CustomFormikSendFormButton
                        text='Sign In'
                        isSubmitting={isSubmitting}
                        className={styles.sendBtn}
                    />
                </Form>
            )}
        </Formik>
    );
};
