import { Field, Form, Formik, FormikState } from 'formik';
import React, { useState } from 'react'
import { CheckoutOrderDto } from '../../dtos/orders/CheckoutOrder.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import * as Yup from 'yup';
import styles from './OrderForm.module.scss';
import { CustomInput } from '../common/CustomInput/CustomInput';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { Preloader } from '../common/Preloader/Preloader';
import { phoneValidateRegExp } from '../../utils/validation/regularExpressions';
import { phoneNumberMask } from '../../utils/masks/phoneNumberMask';
import { phoneMaskFormat } from '../../utils/transformer/phoneMaskFormat';
import { OrderAuthModal } from '../OrderAuthModal/OrderAuthModal';
import { CreateOrderDto } from '../../dtos/orders/CreateOrder.dto';
import { clearCart } from '../../stateManager/slices/cartSlice';

interface IProps {

}

export const OrderForm: React.FC<IProps> = ({ }) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user)
    const orderItems = useAppSelector(state => state.cart.orderItems)
    const [formSendError, setFormSendError] = useState('');
    const [isModalActive, setIsModalActive] = useState(false);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    const formInitialValues: CheckoutOrderDto = {
        phone: user ? phoneMaskFormat(user.phone) : '',
        address: '',
        comment: ''
    };

    const onFormSubmit = async (
        values: CheckoutOrderDto,
        {
            resetForm,
        }: { resetForm: (nextState?: Partial<FormikState<CheckoutOrderDto>>) => void },
    ): Promise<void> => {
        if (orderItems.length === 0) {
            setFormSendError('to place an order, add products to the cart')
            return
        }

        if (!user) {
            setFormSendError('');
            setIsModalActive(true)
            return
        }

        try {
            setFormSendError('');
            const formatedPhone = values.phone.replace(/\D/g, '')
            const sendData: CreateOrderDto = {
                phone: formatedPhone,
                address: values.address,
                comment: values.comment,
                orderItems
            }
            //console.log('sendData', sendData);
            //await dispatch(createOrder(sendData));
            dispatch(clearCart())
            resetForm();
            setIsModalActive(true)
            setIsOrderConfirmed(true)
        } catch (e: any) {
            setFormSendError(e.response?.data?.message);
        }
    };

    const validationSchemaObject = Yup.object({
        phone: Yup.string()
            .required()
            .matches(phoneValidateRegExp, 'The phone number is invalid'),
        address: Yup.string().required(),
        comment: Yup.string()
    });

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
                label='Phone'
                component={CustomInput}
            />
        );
    };

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
        <>
            <Formik
                initialValues={formInitialValues}
                onSubmit={onFormSubmit}
                validationSchema={validationSchemaObject}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className={styles.formBody}>
                        {isSubmitting && <Preloader className={styles.preloader} />}
                        {renderPhoneField(setFieldValue)}
                        {renderTextField('address', 'Type your address', 'Address')}
                        {renderTextField('comment', 'Type your comment (optional)', 'Comment')}
                        {renderFormSendErrorBlock()}
                        {renderSendButton(isSubmitting)}
                    </Form>
                )}
            </Formik>
            <OrderAuthModal isActive={isModalActive} setIsActive={setIsModalActive} isOrderConfirmed={isOrderConfirmed} setIsOrderConfirmed={setIsOrderConfirmed} />
        </>
    );
}
