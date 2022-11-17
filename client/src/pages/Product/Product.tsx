import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddProductToCardButton } from '../../components/AddProductToCardButton/AddProductToCardButton';
import { InfoMessage } from '../../components/common/InfoMessage/InfoMessage';
import { Preloader } from '../../components/common/Preloader/Preloader';
import { ComponentCard } from '../../components/ComponentCard/ComponentCard';
import { PriceBlock } from '../../components/PriceBlock/PriceBlock';
import { ToCartQuantityBlock } from '../../components/ToCartQuantityBlock/QuantityCartBlock';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/http';
import { getProductById } from '../../stateManager/actionCreators/products';
import { setCurrentProduct } from '../../stateManager/slices/productsSlice';
import styles from './Product.module.scss';

interface IProps {}

export const Product: React.FC<IProps> = ({}) => {
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector((state) => state.products.isFetching);
    const product = useAppSelector((state) => state.products.currentProduct);
    const orderItems = useAppSelector((state) => state.cart.orderItems);
    const { productId } = useParams();

    useEffect(() => {
        dispatch(getProductById(Number(productId)));

        return () => {
            dispatch(setCurrentProduct(null));
        };
    }, []);

    const renderComponents = (product: ProductDto) => {
        if (!product.components || product.components.length === 0) {
            return null;
        }

        return (
            <div className={styles.productComponents}>
                <h4 className={styles.componentsTitle}>Ingredients</h4>
                <div className={styles.componentsBody}>
                    {product?.components.map((c) => (
                        <ComponentCard
                            key={c.id}
                            component={c}
                            isNeedActiveState={false}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const renderButton = (product: ProductDto) => {
        const orderItemWithProduct = orderItems.find(
            (orderItem) => orderItem.product.id === product.id,
        );

        return orderItemWithProduct ? (
            <ToCartQuantityBlock orderItem={orderItemWithProduct} />
        ) : (
            <AddProductToCardButton product={product} />
        );
    };

    const renderProduct = () => {
        if (!product) {
            return null;
        }

        return (
            <div className={styles.container}>
                <div className={styles.productImage}>
                    <img
                        src={`${API_URL}/${product.image}`}
                        alt={product.name}
                    />
                </div>
                <div className={styles.productContent}>
                    <h4 className={styles.productName}>{product.name}</h4>
                    <p className={styles.productDescription}>
                        {product.description}
                    </p>
                    {renderComponents(product)}
                    <div className={styles.priceAndButtonBlock}>
                        <PriceBlock price={product.price} />
                        {renderButton(product)}
                    </div>
                </div>
            </div>
        );
    };

    if (isFetching) {
        return <Preloader />;
    }

    if ((!product || !product.isActive) && !isFetching) {
        return <InfoMessage>Product not found</InfoMessage>;
    }

    return renderProduct();
};
