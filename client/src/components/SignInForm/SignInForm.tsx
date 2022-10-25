import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import styles from './SignInForm.module.scss';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { CustomInput } from '../common/CustomInput/CustomInput';
import { useAppDispatch } from '../../hooks/redux';
import { signIn } from '../../redux/actionCreators/auth';
import { SignInDto } from '../../dtos/SignIn.dto';
import { Preloader } from '../common/Preloader/Preloader';

interface IProps {}

export const SignInForm: React.FC<IProps> = ({}) => {
    const dispatch = useAppDispatch();
    const [formSendError, setFormSendError] = useState('');

    const formInitialValues: SignInDto = {
        email: '',
        password: '',
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={formInitialValues}
            onSubmit={async (values, { resetForm }) => {
                try {
                    setFormSendError('');
                    console.log(values);
                    await dispatch(signIn(values));
                    resetForm();
                } catch (e: any) {
                    console.log(e.response?.data?.message);
                    setFormSendError(e.response?.data?.message);
                }
            }}
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required().min(6).max(100),
            })}
        >
            {({ isSubmitting }) => (
                <Form className={styles.formBody}>
                    {isSubmitting && <Preloader className={styles.preloader} />}
                    <Field
                        type='text'
                        name='email'
                        placeholder='Type your email'
                        allItemClass={[styles.item, styles.titleBlock].join(
                            ' ',
                        )}
                        label='Email'
                        labelClass={styles.labelStyle}
                        errorBlock={styles.inputError}
                        validationInputError={styles.validationInputError}
                        className={styles.formInput}
                        component={CustomInput}
                    />
                    <Field
                        type='text'
                        name='password'
                        placeholder='Type your password'
                        allItemClass={[styles.item, styles.titleBlock].join(
                            ' ',
                        )}
                        label='Password'
                        labelClass={styles.labelStyle}
                        errorBlock={styles.inputError}
                        validationInputError={styles.validationInputError}
                        className={styles.formInput}
                        component={CustomInput}
                    />
                    {formSendError && (
                        <p className={styles.errMessage}>
                            Try again, please. Some error occured:{' '}
                            {formSendError}
                        </p>
                    )}
                    <CustomButton
                        type='submit'
                        startColor='green'
                        /* disabled={isFetchingSaving || isFetchingUpdating} */
                        disabled={isSubmitting}
                        className={styles.sendBtn}
                    >
                        Submit rent
                    </CustomButton>
                </Form>
            )}
        </Formik>
    );
};
