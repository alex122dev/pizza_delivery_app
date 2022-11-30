import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { OrderDto } from '../../dtos/orders/Order.dto';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { phoneMaskFormat } from '../../utils/transformer/phoneMaskFormat';
import { phoneValidateRegExp } from '../../utils/validation/regularExpressions';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { Preloader } from '../common/Preloader/Preloader';
import { CheckoutUpdateOrderDto } from '../../dtos/orders/CheckoutUpdateOrder.dto';
import { UpdateOrderDto } from '../../dtos/orders/UpdateOrderdto';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import { updateOrder } from '../../stateManager/actionCreators/orders';
import { ModalWindow } from '../common/ModalWindow/ModalWindow';
import { removeFromEditingOrders } from '../../stateManager/slices/ordersSlice';
import { CustomFormikPhoneField } from '../CustomFormikPhoneField/CustomFormikPhoneField';
import { CustomFormikTextField } from '../CustomFormikTextField/CustomFormikTextField';
import { CustomFormikSendFormButton } from '../CustomFormikSendFormButton/CustomFormikSendFormButton';
import { CustomFormikSendError } from '../CustomFormikSendError/CustomFormikSendError';
import styles from './EditOrderForm.module.scss';
import { CustomFormikSelectField } from '../CustomFormikSelectField/CustomFormikSelectField';

interface IProps {
  order: OrderDto;
  localOrderItems: CreateOrderItemDto[];
}

export const EditOrderForm: React.FC<IProps> = ({ order, localOrderItems }) => {
  const dispatch = useAppDispatch();
  const statuses = useAppSelector((state) => state.statuses.statuses);
  const [formSendError, setFormSendError] = useState('');
  const [isModalActive, setIsModalActive] = useState(false);

  const formInitialValues: CheckoutUpdateOrderDto = {
    phone: phoneMaskFormat(order.phone),
    address: order.address,
    status: order.status.value,
    comment: order.comment || '',
  };

  const statusesOptions = statuses.map((status) => ({
    value: status.value,
    label: status.value,
  }));

  const onFormSubmit = async (
    values: CheckoutUpdateOrderDto,
  ): Promise<void> => {
    if (localOrderItems.length === 0) {
      setFormSendError('to change an order add products');
      return;
    }

    try {
      setFormSendError('');
      const formatedPhone = values.phone.replace(/\D/g, '');
      const sendData: UpdateOrderDto = {
        phone: formatedPhone,
        address: values.address,
        comment: values.comment,
        status: values.status,
        orderItems: localOrderItems,
      };
      await dispatch(updateOrder(order.id, sendData));
      setIsModalActive(true);
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
    status: Yup.string().required(),
  });

  const renderSuccessButton = () => {
    return (
      <CustomButton
        startColor='green'
        onClick={(e) => {
          dispatch(removeFromEditingOrders(order.id));
          setIsModalActive(false);
        }}
      >
        Ok
      </CustomButton>
    );
  };

  const renderInfoModal = () => {
    return (
      <ModalWindow isActive={isModalActive} setIsActive={setIsModalActive}>
        <div className={styles.modalBody}>
          <h2 className={styles.modalTitle}>
            Changes saved. The order with ID {order.id} has been updated
          </h2>
          {renderSuccessButton()}
        </div>
      </ModalWindow>
    );
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={onFormSubmit}
      validationSchema={validationSchemaObject}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className={styles.formBody}>
          {isSubmitting && <Preloader className={styles.preloader} />}
          <CustomFormikPhoneField setFieldValue={setFieldValue} />
          <CustomFormikTextField
            name='address'
            label='Address'
            placeholder='Type your address'
          />
          <CustomFormikSelectField
            fieldName='status'
            setFieldValue={setFieldValue}
            initialValue={values.status}
            label={'Status'}
            options={statusesOptions}
          />
          <CustomFormikTextField
            name='comment'
            label='Comment'
            placeholder='Type your comment (optional)'
          />
          {formSendError && <CustomFormikSendError message={formSendError} />}
          <CustomFormikSendFormButton
            text='Save Changes'
            isSubmitting={isSubmitting}
          />
          {renderInfoModal()}
        </Form>
      )}
    </Formik>
  );
};
