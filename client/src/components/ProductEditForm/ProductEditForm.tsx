import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { EditProductDto } from '../../dtos/products/editProduct.dto';
import { EditProductFormValuesDto } from '../../dtos/products/editProductFormValues.dto';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
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
import { ModalWindow } from '../common/ModalWindow/ModalWindow';
import { Preloader } from '../common/Preloader/Preloader';
import { ComponentCard } from '../ComponentCard/ComponentCard';
import { CropImageModal } from '../CropImageModal/CropImageModal';
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

    const [imageFile, setImageFile] = useState<File>();
    const [croppedImageFile, setCroppedImageFile] = useState<File>();

    const [isCropModalActive, setIsCropModalActive] = useState(false);

    const formInitialValues: EditProductFormValuesDto = {
        name: product?.name || '',
        description: product?.description || '',
        price: product ? product.price / 100 : 0,
        isActive: product ? product.isActive : true,
        categoryId: product?.category.id || categories[0].id,
        componentIds: product ? productComponentIds : [],
    };

    const categoriesOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const onFormSubmit = async (
        values: EditProductFormValuesDto,
    ): Promise<void> => {
        if (!product && !croppedImageFile) {
            setFormSendError('You must add an image to create a new product');
            return;
        }

        try {
            setFormSendError('');
            const sendData: EditProductDto = {
                name: values.name,
                description: values.description,
                categoryId: values.categoryId,
                isActive: values.isActive,
                price: values.price * 100,
                componentIds: values.componentIds,
            };

            if (croppedImageFile) {
                sendData.image = croppedImageFile;
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

    const imageFileValidate = (file: File, setFile: (f: File) => void) => {
        const isValid = isFileTypeCorrect(file);
        if (isValid) {
            setFormSendError('');
            setFile(file);
            setIsCropModalActive(true);
            return;
        } else {
            setFormSendError('Invalid file type');
        }
    };

    const validationSchemaObject = Yup.object().shape({
        name: Yup.string().required(),
        description: Yup.string().required(),
        price: Yup.number().min(1).required(),
        isActive: Yup.boolean().required(),
        categoryId: Yup.number().required(),
        componentIds: Yup.array().of(Yup.number()),
    });

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
                        {product?.image && !imageFile && (
                            <div className={styles.previewBlock}>
                                <h4 className={styles.imageTitle}>
                                    Current Image
                                </h4>
                                <ImagePreview image={product.image} />
                            </div>
                        )}
                        {croppedImageFile && (
                            <div className={styles.previewBlock}>
                                <h4 className={styles.imageTitle}>
                                    New Image Preview
                                </h4>
                                <ImagePreview image={croppedImageFile} />
                            </div>
                        )}
                        <input
                            type='file'
                            hidden
                            accept='image/*'
                            ref={fileInputRef}
                            onChange={(e: any) => {
                                imageFileValidate(
                                    e.target.files?.[0],
                                    setImageFile,
                                );
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
                        {imageFile && (
                            <>
                                <CustomButton
                                    startColor='green'
                                    onClick={(e) => setIsCropModalActive(true)}
                                >
                                    Select another part
                                </CustomButton>
                                <CustomButton
                                    startColor='red'
                                    onClick={() => {
                                        setImageFile(undefined);
                                        setCroppedImageFile(undefined);
                                        setFormSendError('');
                                        if (fileInputRef.current)
                                            fileInputRef.current.value = '';
                                    }}
                                >
                                    Reset Image
                                </CustomButton>
                            </>
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
                    <CropImageModal
                        isActive={isCropModalActive}
                        setIsActive={setIsCropModalActive}
                        imageFile={imageFile}
                        setResult={setCroppedImageFile}
                    />
                </Form>
            )}
        </Formik>
    );
};
