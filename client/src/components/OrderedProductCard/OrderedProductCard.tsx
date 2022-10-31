import React from 'react'
import { Link } from 'react-router-dom';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import { ProductDto } from '../../dtos/products/product.dto';
import { useAppDispatch } from '../../hooks/redux';
import { API_URL } from '../../http/http';
import { removeProduct } from '../../stateManager/slices/cartSlice';
import { CloseButton } from '../CloseButton/CloseButton';
import { CounterProductBlock } from '../CounterProductBlock/CounterProductBlock';
import styles from './OrderedProductCard.module.scss';

interface IProps {
    orderItem: CreateOrderItemDto
}

export const OrderedProductCard: React.FC<IProps> = ({ orderItem }) => {
    const dispatch = useAppDispatch()

    const renderRemoveBtn = () => {
        return <CloseButton
            onClick={() => dispatch(removeProduct(orderItem.product.id))} />
    }

    const renderProduct = (product: Omit<ProductDto, 'category' | 'components'>) => {
        return <div className={styles.body}>
            <Link to={`/products/${product.id}`} className={styles.productLink} />
            <div className={styles.image}>
                <img src={`${API_URL}/${product.image}`} alt={product.name} />
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
                    {<CounterProductBlock orderItem={orderItem} />}
                </div>
            </div>
            {renderRemoveBtn()}
        </div>
    }

    return renderProduct(orderItem.product)
}
