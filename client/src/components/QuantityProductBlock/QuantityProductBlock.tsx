import React from 'react';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import { useAppDispatch } from '../../hooks/redux';
import {
    decrementQuantity,
    incrementQuantity,
} from '../../stateManager/slices/cartSlice';
import styles from './QuantityProductBlock.module.scss';

interface IProps {
    orderItem: CreateOrderItemDto;
}

export const QuantityProductBlock: React.FC<IProps> = ({ orderItem }) => {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.quantityBlock}>
            <button
                className={[styles.quantityBtn, styles.decrementBtn].join(' ')}
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(decrementQuantity(orderItem.product.id));
                }}
            />
            <span className={styles.quantity}>{orderItem.quantity}</span>
            <button
                className={[styles.quantityBtn, styles.incrementBtn].join(' ')}
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(incrementQuantity(orderItem.product.id));
                }}
            />
        </div>
    );
};
