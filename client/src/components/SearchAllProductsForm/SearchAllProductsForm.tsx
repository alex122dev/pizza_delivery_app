import { Form, Formik } from 'formik';
import React from 'react';
import { ProductsFilterDto } from '../../dtos/products/productsFilter.dto';
import { ProductsFilterFormDto } from '../../dtos/products/productsFilterForm.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllProducts } from '../../stateManager/actionCreators/products';
import { OptionType } from '../common/CustomSelect/CustomSelect';
import { CustomFormikNumberField } from '../CustomFormikNumberField/CustomFormikNumberField';
import { CustomFormikSelectField } from '../CustomFormikSelectField/CustomFormikSelectField';
import { CustomFormikSendFormButton } from '../CustomFormikSendFormButton/CustomFormikSendFormButton';
import { CustomFormikTextField } from '../CustomFormikTextField/CustomFormikTextField';
import styles from './SearchAllProductsForm.module.scss';

interface IProps {}

export const SearchAllProductsForm: React.FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { id, name, isActive, category } = useAppSelector(
    (state) => state.products.filter,
  );
  const pageSize = useAppSelector((state) => state.products.pageSize);
  const categories = useAppSelector((state) => state.categories.categories);

  const formInitialValues: ProductsFilterFormDto = {
    id: id || '',
    name: name || '',
    category: category || '',
    isActive: isActive ? String(isActive) : '',
  };

  const categoriesOptions: OptionType[] = [
    { value: '', label: 'all' },
    ...categories.map((c) => ({
      value: c.name,
      label: c.name,
    })),
  ];

  const isActiveOptions: OptionType[] = [
    { value: '', label: 'all' },
    { value: 'true', label: 'true' },
    { value: 'false', label: 'false' },
  ];

  const onFormSubmit = async (values: ProductsFilterFormDto): Promise<void> => {
    try {
      const sendData: ProductsFilterDto = {
        id: values.id,
        name: values.name,
        category: values.category,
        isActive: values.isActive,
      };
      await dispatch(getAllProducts(1, pageSize, sendData));
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
            name='id'
            label='Product ID'
            placeholder='Enter the product ID'
          />
          <CustomFormikTextField
            name='name'
            label='Name'
            placeholder='Enter the product name'
          />
          <CustomFormikSelectField
            fieldName='category'
            setFieldValue={setFieldValue}
            initialValue={values.category}
            label={'Category'}
            options={categoriesOptions}
            startPlaceholder={'all'}
          />
          <CustomFormikSelectField
            fieldName='isActive'
            setFieldValue={setFieldValue}
            initialValue={values.isActive}
            label={'IsActive'}
            options={isActiveOptions}
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
