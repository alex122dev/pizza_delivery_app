import { Field, Form, Formik, FormikState } from 'formik';
import React, { useState } from 'react'
import { CheckoutOrderDto } from '../../dtos/orders/CheckoutOrder.dto';
import { useAppDispatch } from '../../hooks/redux';
import * as Yup from 'yup';
import styles from './OrderForm.module.scss';
import { CustomInput } from '../common/CustomInput/CustomInput';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { Preloader } from '../common/Preloader/Preloader';

interface IProps {

}

export const OrderForm: React.FC<IProps> = ({ }) => {
    const dispatch = useAppDispatch();
    const [formSendError, setFormSendError] = useState('');

    const formInitialValues: CheckoutOrderDto = {
        address: '',
        comment: ''
    };

    const onFormSubmit = async (
        values: CheckoutOrderDto,
        {
            resetForm,
        }: { resetForm: (nextState?: Partial<FormikState<CheckoutOrderDto>>) => void },
    ): Promise<void> => {
        try {
            setFormSendError('');
            //await dispatch(signIn(values));
            resetForm();
        } catch (e: any) {
            setFormSendError(e.response?.data?.message);
        }
    };

    const validationSchemaObject = Yup.object({
        address: Yup.string().required(),
        date: Yup.string().required(),
        payment: Yup.string().required(),
        comment: Yup.string()
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
                Checkout
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
                    {renderTextField('address', 'Type your address', 'Address')}
                    {renderTextField('address', 'Type your address', 'Address')}
                    {renderTextField('comment', 'Type your comment (optional)', 'Comment')}
                    {renderFormSendErrorBlock()}
                    {renderSendButton(isSubmitting)}
                </Form>
            )}
        </Formik>
    );
}
