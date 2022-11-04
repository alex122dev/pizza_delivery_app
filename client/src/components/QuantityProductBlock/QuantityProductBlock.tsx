import React from 'react';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import styles from './QuantityProductBlock.module.scss';

interface IProps {
    orderItem: CreateOrderItemDto;
    decrementQuantity: (orderItem: CreateOrderItemDto) => void;
    incrementQuantity: (orderItem: CreateOrderItemDto) => void;
}

export const QuantityProductBlock: React.FC<IProps> = ({
    orderItem,
    decrementQuantity,
    incrementQuantity,
}) => {
    return (
        <div className={styles.quantityBlock}>
            <button
                className={[styles.quantityBtn, styles.decrementBtn].join(' ')}
                onClick={(e) => {
                    e.preventDefault();
                    decrementQuantity(orderItem);
                }}
            />
            <span className={styles.quantity}>{orderItem.quantity}</span>
            <button
                className={[styles.quantityBtn, styles.incrementBtn].join(' ')}
                onClick={(e) => {
                    e.preventDefault();
                    incrementQuantity(orderItem);
                }}
            />
        </div>
    );
};
