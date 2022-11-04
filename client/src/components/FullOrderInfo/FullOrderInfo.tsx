import React from 'react';
import styles from './FullOrderInfo.module.scss';
import { OrderItemDto } from '../../dtos/orders/OrderItem.dto';
import { OrderDto } from '../../dtos/orders/Order.dto';
import { OrderedProductCard } from '../OrderedProductCard/OrderedProductCard';

interface IProps {
    order: OrderDto;
}

export const FullOrderInfo: React.FC<IProps> = ({ order }) => {
    const renderFullOrderProperty = (title: string, text: string) => {
        return (
            <div className={styles.fullOrderProperty}>
                <span className={styles.fullOrderTitle}>{title}:</span> {text}
            </div>
        );
    };

    const renderQuantityBlock = (orderItem: OrderItemDto) => {
        return (
            <div className={styles.quantityBlock}>
                {orderItem.quantity} unit{orderItem.quantity > 1 && 's'}
            </div>
        );
    };

    return (
        <div className={styles.fullOrderBody}>
            <div className={styles.textBlock}>
                {renderFullOrderProperty('id', `${order.id}`)}
                {renderFullOrderProperty('address', `${order.address}`)}
                {renderFullOrderProperty('phone', `${order.phone}`)}
                {renderFullOrderProperty(
                    'status',
                    `${order.status.value} - ${order.status.description}`,
                )}
                {renderFullOrderProperty(
                    'total Price',
                    `${order.totalPrice / 100} UAH`,
                )}
                {renderFullOrderProperty('comment', `${order.comment}`)}
            </div>
            <div className={styles.orderItemsBlock}>
                {order.orderItems.map((orderItem) => (
                    <OrderedProductCard
                        key={orderItem.id}
                        orderItem={orderItem}
                        quantity={renderQuantityBlock(orderItem)}
                    />
                ))}
            </div>
        </div>
    );
};
