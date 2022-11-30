import { Form, Formik } from 'formik';
import React from 'react';
import { OrdersFilterDto } from '../../dtos/orders/OrdersFilter.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import styles from './SearchAllOrdersForm.module.scss';
import { getAllOrders } from '../../stateManager/actionCreators/orders';
import { CustomFormikSendFormButton } from '../CustomFormikSendFormButton/CustomFormikSendFormButton';
import { CustomFormikNumberField } from '../CustomFormikNumberField/CustomFormikNumberField';
import { OptionType } from '../common/CustomSelect/CustomSelect';
import { CustomFormikSelectField } from '../CustomFormikSelectField/CustomFormikSelectField';
import { OrdersFilterFormDto } from '../../dtos/orders/OrdersFilterForm.dto';

interface IProps {}

export const SearchAllOrdersForm: React.FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { orderId, userId, status } = useAppSelector(
    (state) => state.orders.filter,
  );
  const pageSize = useAppSelector((state) => state.orders.pageSize);
  const statuses = useAppSelector((state) => state.statuses.statuses);

  const formInitialValues: OrdersFilterFormDto = {
    orderId: orderId || '',
    userId: userId || '',
    status: status || '',
  };

  const statusesOptions: OptionType[] = [
    { value: '', label: 'all' },
    ...statuses.map((status) => ({
      value: status.value,
      label: status.value,
    })),
  ];

  const onFormSubmit = async (values: OrdersFilterFormDto): Promise<void> => {
    try {
      const sendData: OrdersFilterDto = {
        orderId: values.orderId,
        userId: values.userId,
        status: values.status,
      };
      await dispatch(getAllOrders(1, pageSize, sendData));
    } catch (e) {}
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={formInitialValues}
      onSubmit={onFormSubmit}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className={styles.formBody}>
          <CustomFormikNumberField
            name='orderId'
            label='Order ID'
            placeholder='Enter the order ID'
          />
          <CustomFormikNumberField
            name='userId'
            label='User ID'
            placeholder='Enter the user ID'
          />
          <CustomFormikSelectField
            fieldName='status'
            setFieldValue={setFieldValue}
            initialValue={values.status}
            label={'Status'}
            options={statusesOptions}
            startPlaceholder={'all'}
          />
          <CustomFormikSendFormButton
            text='Search'
            isSubmitting={isSubmitting}
            className={styles.sendBtn}
          />
        </Form>
      )}
    </Formik>
  );
};
