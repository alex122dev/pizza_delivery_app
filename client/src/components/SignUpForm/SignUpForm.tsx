import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import styles from './SignUpForm.module.scss';
import { SignUpDto } from '../../dtos/SignUp.dto';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { CustomInput } from '../common/CustomInput/CustomInput';
import { useAppDispatch } from '../../hooks/redux';
import { signUp } from '../../redux/actionCreators/auth';
import { Preloader } from '../common/Preloader/Preloader';

interface IProps {}

const phoneRegExp = /^[0-9]{3}[0-9]{2}[0-9]{3}[0-9]{4,5}$/;

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

    return (
        <Formik
            enableReinitialize={true}
            initialValues={formInitialValues}
            onSubmit={async (values, { resetForm }) => {
                try {
                    setFormSendError('');
                    console.log(values);
                    await dispatch(signUp(values));
                    console.log('ok');
                    resetForm();
                } catch (e: any) {
                    console.log(e.response?.data?.message);
                    setFormSendError(e.response?.data?.message);
                    //console.log(e);
                }
            }}
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required().min(6).max(100),
                firstName: Yup.string().required(),
                lastName: Yup.string().required(),
                phone: Yup.string()
                    .required()
                    .matches(phoneRegExp, 'The phone number is invalid'),
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
                    <Field
                        type='text'
                        name='firstName'
                        placeholder='Type your first name'
                        allItemClass={[styles.item, styles.titleBlock].join(
                            ' ',
                        )}
                        label='First name'
                        labelClass={styles.labelStyle}
                        errorBlock={styles.inputError}
                        validationInputError={styles.validationInputError}
                        className={styles.formInput}
                        component={CustomInput}
                    />
                    <Field
                        type='text'
                        name='lastName'
                        placeholder='Type your last name'
                        allItemClass={[styles.item, styles.titleBlock].join(
                            ' ',
                        )}
                        label='Last name'
                        labelClass={styles.labelStyle}
                        errorBlock={styles.inputError}
                        validationInputError={styles.validationInputError}
                        className={styles.formInput}
                        component={CustomInput}
                    />
                    <Field
                        type='tel'
                        name='phone'
                        placeholder='380952222222'
                        maxLength='12'
                        allItemClass={[styles.item, styles.priceBlock].join(
                            ' ',
                        )}
                        label='Phone'
                        labelClass={styles.labelStyle}
                        errorBlock={styles.inputError}
                        validationInputError={styles.validationInputError}
                        className={[
                            styles.formInput,
                            styles.inputNumberType,
                        ].join(' ')}
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
