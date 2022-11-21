import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { EditProductFormValuesDto } from '../../dtos/products/editProductFormValues.dto';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/http';
import { getAllCategories } from '../../stateManager/actionCreators/categories';
import {
    createNewProduct,
    getAllProducts,
    updateProduct,
} from '../../stateManager/actionCreators/products';
import { removeFromEditingProducts } from '../../stateManager/slices/productsSlice';
import { isFileTypeCorrect } from '../../utils/validation/functions';
import { ChooseComponentsModal } from '../ChooseComponentsModal/ChooseComponentsModal';
import { CloseButton } from '../CloseButton/CloseButton';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { CustomInput } from '../common/CustomInput/CustomInput';
import { ModalWindow } from '../common/ModalWindow/ModalWindow';
import { Preloader } from '../common/Preloader/Preloader';
import { ComponentCard } from '../ComponentCard/ComponentCard';
import { CustomFormikCheckboxField } from '../CustomFormikCheckboxField/CustomFormikCheckboxField';
import { CustomFormikNumberField } from '../CustomFormikNumberField/CustomFormikNumberField';
import { CustomFormikSelectField } from '../CustomFormikSelectField/CustomFormikSelectField';
import { CustomFormikSendError } from '../CustomFormikSendError/CustomFormikSendError';
import { CustomFormikSendFormButton } from '../CustomFormikSendFormButton/CustomFormikSendFormButton';
import { CustomFormikTextField } from '../CustomFormikTextField/CustomFormikTextField';
import { ImagePreview } from '../ImagePreview/ImagePreview';
import styles from './ProductEditForm.module.scss';

interface IProps {
    product?: ProductDto;
    setIsCreating?: (b: boolean) => void;
}

export const ProductEditForm: React.FC<IProps> = ({
    product,
    setIsCreating,
}) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.categories.categories);
    const [formSendError, setFormSendError] = useState('');
    const [isModalActive, setIsModalActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const productComponentIds = product?.components.map((c) => c.id);
    const [isComponentsModalActive, setIsComponentsModalActive] =
        useState(false);
    const allComponents = useAppSelector(
        (state) => state.components.allComponents,
    );
    const currentPage = useAppSelector((state) => state.products.currentPage);
    const pageSize = useAppSelector((state) => state.products.pageSize);
    const filter = useAppSelector((state) => state.products.filter);

    const formInitialValues: EditProductFormValuesDto = {
        name: product?.name || '',
        description: product?.description || '',
        price: product ? product.price / 100 : 0,
        isActive: product ? product.isActive : true,
        categoryId: product?.category.id || categories[0].id,
        componentIds: product ? productComponentIds : [],
        image: undefined,
    };

    const categoriesOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const onFormSubmit = async (
        values: EditProductFormValuesDto,
    ): Promise<void> => {
        if (!product && !values.image) {
            setFormSendError('You must add an image to create a new product');
            return;
        }

        try {
            setFormSendError('');
            const sendData: EditProductFormValuesDto = {
                name: values.name,
                description: values.description,
                categoryId: values.categoryId,
                isActive: values.isActive,
                price: values.price * 100,
                componentIds: values.componentIds,
            };

            if (values.image) {
                sendData.image = values.image;
            }

            if (product) {
                await dispatch(updateProduct(product.id, sendData));
            } else {
                await dispatch(createNewProduct(sendData));
            }

            setIsModalActive(true);
        } catch (e: any) {
            setFormSendError(e.response?.data?.message);
        }
    };

    const imageValidate = (file: File) => {
        const isValid = isFileTypeCorrect(file);
        setFormSendError(isValid ? '' : 'Invalid file type');
        return isValid;
    };

    const validationSchemaObject = Yup.object().shape(
        {
            name: Yup.string().required(),
            description: Yup.string().required(),
            price: Yup.number().min(1).required(),
            isActive: Yup.boolean().required(),
            categoryId: Yup.number().required(),
            componentIds: Yup.array().of(Yup.number()),
            image: Yup.mixed().when('image', {
                is: (image: any) => image,
                then: Yup.mixed().test(
                    'Invalid file type',
                    'Invalid file type',
                    imageValidate,
                ),
                otherwise: Yup.mixed().test(() => {
                    setFormSendError('');
                    return true;
                }),
            }),
        },
        [['image', 'image']],
    );

    const renderSuccessButton = () => {
        return (
            <CustomButton
                startColor='green'
                onClick={(e) => {
                    setIsModalActive(false);
                    dispatch(getAllCategories());
                    if (product) {
                        dispatch(removeFromEditingProducts(product.id));
                    } else {
                        setIsCreating && setIsCreating(false);
                        dispatch(getAllProducts(currentPage, pageSize, filter));
                    }
                }}
            >
                Ok
            </CustomButton>
        );
    };

    const renderInfoModal = () => {
        return (
            <ModalWindow
                isActive={isModalActive}
                setIsActive={setIsModalActive}
            >
                <div className={styles.modalBody}>
                    <h2 className={styles.modalTitle}>
                        Success. Product has been saved.
                    </h2>
                    {renderSuccessButton()}
                </div>
            </ModalWindow>
        );
    };

    const renderComponent = (
        id: number,
        componentIds: number[],
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean,
        ) => void,
    ) => {
        const newComponent = allComponents.find((c) => c.id === id);
        if (!newComponent) return null;

        const renderDeleteComponentBtn = () => {
            return (
                <CloseButton
                    className={styles.deleteComponentBtn}
                    onClick={(e) =>
                        setFieldValue(
                            'componentIds',
                            componentIds.filter((compId) => compId !== id),
                        )
                    }
                />
            );
        };

        return (
            <ComponentCard
                key={id}
                component={newComponent}
                isChecked={false}
                button={renderDeleteComponentBtn()}
                isNeedActiveState={false}
            />
        );
    };

    const renderComponents = (
        componentIds: number[],
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean,
        ) => void,
    ) => {
        if (!componentIds || componentIds.length === 0) {
            return null;
        }

        return (
            <div className={styles.productComponents}>
                <h4 className={styles.componentsTitle}>Ingredients</h4>
                <div className={styles.componentsBody}>
                    {componentIds.map((id) =>
                        renderComponent(id, componentIds, setFieldValue),
                    )}
                </div>
            </div>
        );
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={formInitialValues}
            onSubmit={onFormSubmit}
            validationSchema={validationSchemaObject}
        >
            {({ isSubmitting, setFieldValue, values, isValid }) => (
                <Form className={styles.formBody}>
                    {isSubmitting && <Preloader className={styles.preloader} />}
                    <div className={styles.imageBlock}>
                        {product?.image && !values.image && (
                            <div className={styles.productImage}>
                                <img
                                    src={`${API_URL}/${product.image}`}
                                    alt='image'
                                />
                            </div>
                        )}
                        {values.image && <ImagePreview file={values.image} />}
                        <Field
                            name='image'
                            type='file'
                            allItemClass={styles.fileInputBlock}
                            value={undefined} // for normal working react
                            accept='image/*'
                            innerRef={fileInputRef}
                            component={CustomInput}
                            onChange={(e: any) => {
                                setFieldValue('image', e.target.files?.[0]);
                            }}
                        />
                        <CustomButton
                            startColor='blue'
                            className={styles.uploadBtn}
                            onClick={() => {
                                fileInputRef.current?.click();
                            }}
                        >
                            Upload New Image
                        </CustomButton>
                        {values.image && (
                            <CustomButton
                                startColor='red'
                                onClick={() => {
                                    setFieldValue('image', '');
                                    setFormSendError('');
                                    if (fileInputRef.current)
                                        fileInputRef.current.value = '';
                                }}
                            >
                                Reset Image
                            </CustomButton>
                        )}
                    </div>
                    <div className={styles.textBlock}>
                        <CustomFormikTextField
                            name='name'
                            label='Product name'
                            placeholder='Type product name'
                        />
                        <CustomFormikTextField
                            name='description'
                            label='Description'
                            placeholder='Type product description'
                        />
                        <CustomFormikNumberField
                            name='price'
                            label='Price'
                            placeholder='Type product price'
                        />
                        <CustomFormikSelectField
                            fieldName='categoryId'
                            setFieldValue={setFieldValue}
                            initialValue={values.categoryId}
                            label={'Category'}
                            options={categoriesOptions}
                        />
                        <Field
                            name='isActive'
                            label='Is Active'
                            checked={values.isActive}
                            uniqueId={
                                product?.id || 'createNewProductCheckboxId'
                            }
                            component={CustomFormikCheckboxField}
                        />
                        {renderComponents(
                            values.componentIds || [],
                            setFieldValue,
                        )}
                        <CustomButton
                            startColor='blue'
                            className={styles.addComponentsBtn}
                            onClick={(e) => setIsComponentsModalActive(true)}
                        >
                            Add components
                        </CustomButton>
                        {
                            <ChooseComponentsModal
                                isActive={isComponentsModalActive}
                                setIsActive={setIsComponentsModalActive}
                                componentIds={values.componentIds || []}
                                setFieldValue={(v) =>
                                    setFieldValue('componentIds', v)
                                }
                            />
                        }
                        {formSendError && (
                            <CustomFormikSendError message={formSendError} />
                        )}
                        <CustomFormikSendFormButton
                            text={product ? 'Save Changes' : 'Create'}
                            isSubmitting={isSubmitting || !isValid}
                        />
                    </div>
                    {renderInfoModal()}
                </Form>
            )}
        </Formik>
    );
};
