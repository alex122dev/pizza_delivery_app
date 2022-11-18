import React, { useEffect, useState } from 'react';
import { AdminProductCard } from '../../components/AdminProductCard/AdminProductCard';
import { CustomButton } from '../../components/common/CustomButton/CustomButton';
import { Preloader } from '../../components/common/Preloader/Preloader';
import { ProductEditForm } from '../../components/ProductEditForm/ProductEditForm';
import { PropertyNamesRow } from '../../components/PropertyNamesRow/PropertyNamesRow';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllComponents } from '../../stateManager/actionCreators/components';
import { getAllProducts } from '../../stateManager/actionCreators/products';
import {
    addToEditingProducts,
    removeFromEditingProducts,
} from '../../stateManager/slices/productsSlice';
import styles from './AllProducts.module.scss';

interface IProps {}

export const AllProducts: React.FC<IProps> = ({}) => {
    const dispatch = useAppDispatch();
    const allProducts = useAppSelector((state) => state.products.allProducts);
    const editingProducts = useAppSelector(
        (state) => state.products.editingProducts,
    );
    const isFetchingAllProducts = useAppSelector(
        (state) => state.products.isFetchingAllProducts,
    );
    const [isCreatingNewProduct, setIsCreatingNewProduct] = useState(false);
    const propertiesArray = [
        'id',
        'name',
        'description',
        'category',
        'price',
        'is Active',
    ];

    useEffect(() => {
        dispatch(getAllComponents());
        dispatch(getAllProducts());
    }, []);

    const renderEditButton = (product: ProductDto) => {
        return editingProducts.some((id) => id === product.id) ? (
            <CustomButton
                startColor='red'
                className={styles.editBtn}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(removeFromEditingProducts(product.id));
                }}
            >
                Cancel
            </CustomButton>
        ) : (
            <CustomButton
                startColor='blue'
                onClick={(e) => dispatch(addToEditingProducts(product.id))}
            >
                Edit
            </CustomButton>
        );
    };

    const renderEditForm = (product: ProductDto) => {
        if (!editingProducts.some((id) => id === product.id)) {
            return null;
        }

        return <ProductEditForm product={product} />;
    };

    const renderCreateButton = () => {
        return isCreatingNewProduct ? (
            <CustomButton
                startColor='red'
                onClick={(e) => setIsCreatingNewProduct(false)}
            >
                Cancel
            </CustomButton>
        ) : (
            <CustomButton
                startColor='green'
                onClick={(e) => setIsCreatingNewProduct(true)}
            >
                Create New
            </CustomButton>
        );
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>All products</h2>
            <div className={styles.productsList}>
                {<PropertyNamesRow names={propertiesArray} />}
                {isFetchingAllProducts && <Preloader />}
                {renderCreateButton()}
                {isCreatingNewProduct && (
                    <div className={styles.createBlock}>
                        <ProductEditForm
                            setIsCreating={setIsCreatingNewProduct}
                        />
                    </div>
                )}
                {allProducts.map((p) => (
                    <AdminProductCard
                        key={p.id}
                        product={p}
                        button={renderEditButton(p)}
                        productEditingElement={renderEditForm(p)}
                    />
                ))}
            </div>
        </div>
    );
};
