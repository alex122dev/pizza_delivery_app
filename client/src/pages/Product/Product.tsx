import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddProductToCardButton } from '../../components/AddProductToCardButton/AddProductToCardButton';
import { InfoMessage } from '../../components/common/InfoMessage/InfoMessage';
import { Preloader } from '../../components/common/Preloader/Preloader';
import { CounterProductBlock } from '../../components/CounterProductBlock/CounterProductBlock';
import { ComponentDto } from '../../dtos/components/component.dto';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { API_URL } from '../../http/http';
import { getProductById } from '../../stateManager/actionCreators/products';
import { setCurrentProduct } from '../../stateManager/slices/productsSlice';
import styles from './Product.module.scss';

interface IProps { }

export const Product: React.FC<IProps> = ({ }) => {
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector((state) => state.products.isFetching);
    const product = useAppSelector((state) => state.products.currentProduct);
    const orderItems = useAppSelector(state => state.cart.orderItems)
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
                    {product?.components.map(renderComponent)}
                </div>
            </div>
        );
    };

    const renderComponent = (component: ComponentDto) => {
        return (
            <div key={component.id} className={styles.componentsItem}>
                <div className={styles.componentImage}>
                    <img
                        src={`${API_URL}/${component.image}`}
                        alt={component.name}
                    />
                </div>
                <p className={styles.componentName}>{component.name}</p>
            </div>
        );
    };

    const renderButton = (product: ProductDto) => {
        const orderItemWithProduct = orderItems.find(orderItem => orderItem.product.id === product.id)

        return orderItemWithProduct
            ? <CounterProductBlock orderItem={orderItemWithProduct} />
            : <AddProductToCardButton product={product} />
    }

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
                        <div className={styles.priceBlock}>
                            <span className={styles.price}>
                                {product.price / 100}
                            </span>
                            <span className={styles.currency}>UAH</span>
                        </div>
                        {renderButton(product)}
                    </div>
                </div>
            </div>
        );
    };

    if (isFetching) {
        return <Preloader />;
    }

    if (!product && !isFetching) {
        return <InfoMessage>Product not found</InfoMessage>;
    }

    return renderProduct();
};
