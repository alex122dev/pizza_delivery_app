import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CustomButton } from '../../components/common/CustomButton/CustomButton';
import { InfoMessage } from '../../components/common/InfoMessage/InfoMessage';
import { Preloader } from '../../components/common/Preloader/Preloader';
import { ComponentDto } from '../../dtos/components/component.dto';
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
    const { productId } = useParams();

    useEffect(() => {
        dispatch(getProductById(Number(productId)));

        return () => {
            dispatch(setCurrentProduct(null));
        };
    }, []);

    const renderComponents = () => {
        return (
            product?.components &&
            product?.components.length > 0 && (
                <div className={styles.productComponents}>
                    <h4 className={styles.componentsTitle}>Ingredients</h4>
                    <div className={styles.componentsBody}>
                        {product.components.map((component: ComponentDto) => {
                            return (
                                <div
                                    key={component.id}
                                    className={styles.componentsItem}
                                >
                                    <div className={styles.componentImage}>
                                        <img
                                            src={`${API_URL}/${component.image}`}
                                            alt={component.name}
                                        />
                                    </div>
                                    <p className={styles.componentName}>
                                        {component.name}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )
        );
    };

    const renderProduct = () => {
        return (
            product && (
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
                        {renderComponents()}
                        <div className={styles.priceAndButtonBlock}>
                            <div className={styles.priceBlock}>
                                <span className={styles.price}>
                                    {product.price / 100}
                                </span>
                                <span className={styles.currency}>UAH</span>
                            </div>
                            <CustomButton
                                startColor='green'
                                className={styles.toCardButton}
                            >
                                To cart
                            </CustomButton>
                        </div>
                    </div>
                </div>
            )
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
