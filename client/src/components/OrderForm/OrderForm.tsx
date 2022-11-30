import { Form, Formik, FormikState } from 'formik';
import React, { useState } from 'react';
import { CheckoutOrderDto } from '../../dtos/orders/CheckoutOrder.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import * as Yup from 'yup';
import styles from './OrderForm.module.scss';
import { Preloader } from '../common/Preloader/Preloader';
import { phoneValidateRegExp } from '../../utils/validation/regularExpressions';
import { phoneMaskFormat } from '../../utils/transformer/phoneMaskFormat';
import { OrderAuthModal } from '../OrderAuthModal/OrderAuthModal';
import { CreateOrderDto } from '../../dtos/orders/CreateOrder.dto';
import { clearCart } from '../../stateManager/slices/cartSlice';
import { createOrder } from '../../stateManager/actionCreators/orders';
import { CustomFormikPhoneField } from '../CustomFormikPhoneField/CustomFormikPhoneField';
import { CustomFormikTextField } from '../CustomFormikTextField/CustomFormikTextField';
import { CustomFormikSendError } from '../CustomFormikSendError/CustomFormikSendError';
import { CustomFormikSendFormButton } from '../CustomFormikSendFormButton/CustomFormikSendFormButton';

interface IProps {}

export const OrderForm: React.FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const orderItems = useAppSelector((state) => state.cart.orderItems);
  const [formSendError, setFormSendError] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const formInitialValues: CheckoutOrderDto = {
    phone: user ? phoneMaskFormat(user.phone) : '',
    address: '',
    comment: '',
  };

  const onFormSubmit = async (
    values: CheckoutOrderDto,
    {
      resetForm,
    }: {
      resetForm: (nextState?: Partial<FormikState<CheckoutOrderDto>>) => void;
    },
  ): Promise<void> => {
    if (orderItems.length === 0) {
      setFormSendError('to place an order, add products to the cart');
      return;
    }

    if (!user) {
      setFormSendError('');
      setIsModalActive(true);
      return;
    }

    try {
      setFormSendError('');
      const formatedPhone = values.phone.replace(/\D/g, '');
      const sendData: CreateOrderDto = {
        phone: formatedPhone,
        address: values.address,
        comment: values.comment,
        orderItems,
      };
      await dispatch(createOrder(sendData));
      dispatch(clearCart());
      resetForm();
      setIsModalActive(true);
      setIsOrderConfirmed(true);
    } catch (e: any) {
      setFormSendError(e.response?.data?.message);
    }
  };

  const validationSchemaObject = Yup.object({
    phone: Yup.string()
      .required()
      .matches(phoneValidateRegExp, 'The phone number is invalid'),
    address: Yup.string().required(),
    comment: Yup.string(),
  });

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
            <CustomFormikPhoneField setFieldValue={setFieldValue} />
            <CustomFormikTextField
              name='address'
              label='Address'
              placeholder='Type your address'
            />
            <CustomFormikTextField
              name='comment'
              label='Comment'
              placeholder='Type your comment (optional)'
            />
            {formSendError && <CustomFormikSendError message={formSendError} />}
            <CustomFormikSendFormButton
              text='Checkout'
              isSubmitting={isSubmitting}
              className={styles.sendBtn}
            />
          </Form>
        )}
      </Formik>
      <OrderAuthModal
        isActive={isModalActive}
        setIsActive={setIsModalActive}
        isOrderConfirmed={isOrderConfirmed}
        setIsOrderConfirmed={setIsOrderConfirmed}
      />
    </>
  );
};
