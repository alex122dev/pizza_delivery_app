import React from 'react';
import { Link } from 'react-router-dom';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import { ProductDto } from '../../dtos/products/product.dto';
import { API_URL } from '../../http/http';
import styles from './OrderedProductCard.module.scss';

interface IProps {
    orderItem: CreateOrderItemDto;
    closeButton?: JSX.Element;
    quantity?: JSX.Element;
}

export const OrderedProductCard: React.FC<IProps> = ({
    orderItem,
    closeButton,
    quantity,
}) => {
    const renderProduct = (
        product: Omit<ProductDto, 'category' | 'components'>,
    ) => {
        return (
            <div className={styles.body}>
                <Link
                    to={`/products/${product.id}`}
                    className={styles.productLink}
                />
                <div className={styles.image}>
                    <img
                        src={`${API_URL}/${product.image}`}
                        alt={product.name}
                    />
                </div>
                <div className={styles.content}>
                    <h5 className={styles.name}>{product.name}</h5>
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.priceAndButtonBlock}>
                        <div className={styles.priceBlock}>
                            <span className={styles.price}>
                                {product.price / 100}
                            </span>
                            <span className={styles.currency}>UAH</span>
                        </div>
                        {quantity}
                    </div>
                </div>
                {closeButton}
            </div>
        );
    };

    return renderProduct(orderItem.product);
};
