import React from 'react';
import { Link } from 'react-router-dom';
import { ProductDto } from '../../dtos/products/product.dto';
import { API_URL } from '../../http/http';
import styles from './ProductCard.module.scss';

interface IProps {
    product: Omit<ProductDto, 'category' | 'components'>;
    button?: JSX.Element;
}

export const ProductCard: React.FC<IProps> = ({ product, button }) => {
    return (
        <div key={product.id} className={styles.productCart}>
            <Link to={`/products/${product.id}`}>
                <div className={styles.productImage}>
                    <img
                        src={`${API_URL}/${product.image}`}
                        alt={product.name}
                    />
                </div>
                <div className={styles.productContent}>
                    <p className={styles.productName}>{product.name}</p>
                    <p className={styles.productDescription}>
                        {product.description}
                    </p>
                    <div className={styles.priceAndButtonBlock}>
                        <div className={styles.priceBlock}>
                            <span className={styles.price}>
                                {product.price / 100}
                            </span>
                            <span className={styles.currency}>UAH</span>
                        </div>
                        {button}
                    </div>
                </div>
            </Link>
        </div>
    );
};
