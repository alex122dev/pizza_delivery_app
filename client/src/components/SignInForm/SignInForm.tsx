import { Field, Form, Formik, FormikState } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import styles from './SignInForm.module.scss';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { CustomInput } from '../common/CustomInput/CustomInput';
import { useAppDispatch } from '../../hooks/redux';
import { signIn } from '../../stateManager/actionCreators/auth';
import { SignInDto } from '../../dtos/auth/SignIn.dto';
import { Preloader } from '../common/Preloader/Preloader';

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
                Sign In
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
            {({ isSubmitting }) => (
                <Form className={styles.formBody}>
                    {isSubmitting && <Preloader className={styles.preloader} />}
                    {renderTextField('email', 'Type your email', 'Email')}
                    {renderTextField(
                        'password',
                        'Type your password',
                        'Password',
                    )}
                    {renderFormSendErrorBlock()}
                    {renderSendButton(isSubmitting)}
                </Form>
            )}
        </Formik>
    );
};
