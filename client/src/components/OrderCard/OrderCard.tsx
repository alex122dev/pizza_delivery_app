import cn from 'classnames';
import React, { useState } from 'react';
import { OrderDto } from '../../dtos/orders/Order.dto';
import { OrderItemDto } from '../../dtos/orders/OrderItem.dto';
import { useAppDispatch } from '../../hooks/redux';
import { cancelOrder } from '../../stateManager/actionCreators/orders';
import { CustomButton } from '../common/CustomButton/CustomButton';
import { OrderedProductCard } from '../OrderedProductCard/OrderedProductCard';
import styles from './OrderCard.module.scss';

interface IProps {
    order: OrderDto;
}

export const OrderCard: React.FC<IProps> = ({ order }) => {
    const dispatch = useAppDispatch();
    const [isActiveOrder, setIsActiveOrder] = useState(false);

    const renderCancelButton = () => {
        if (order.status.value !== 'processing') {
            return null;
        }

        return (
            <CustomButton
                startColor='red'
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(cancelOrder(order.id));
                }}
            >
                Cancel
            </CustomButton>
        );
    };

    const renderOrderItemsString = () => {
        return order.orderItems
            .reduce(
                (acc, orderItem) =>
                    acc +
                    orderItem.product.name +
                    ': ' +
                    orderItem.quantity +
                    ', ',
                '',
            )
            .slice(0, -2);
    };

    const renderItem = (text: string) => {
        return <div className={styles.item}>{text}</div>;
    };

    const renderFullOrderItem = (title: string, text: string) => {
        return (
            <div className={styles.fullOrderItem}>
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

    const renderFullOrder = () => {
        if (!isActiveOrder) {
            return null;
        }

        return (
            <div className={styles.fullOrderBody}>
                <div className={styles.textBlock}>
                    {renderFullOrderItem('id', `${order.id}`)}
                    {renderFullOrderItem('address', `${order.address}`)}
                    {renderFullOrderItem('phone', `${order.phone}`)}
                    {renderFullOrderItem(
                        'status',
                        `${order.status.value} - ${order.status.description}`,
                    )}
                    {renderFullOrderItem(
                        'total Price',
                        `${order.totalPrice / 100} UAH`,
                    )}
                    {renderFullOrderItem('comment', `${order.comment}`)}
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

    return (
        <div
            className={cn(styles.container, { [styles.active]: isActiveOrder })}
        >
            <div
                className={cn(styles.body, { [styles.active]: isActiveOrder })}
                onClick={(e) => setIsActiveOrder(!isActiveOrder)}
            >
                {renderItem(`${order.id}`)}
                {renderItem(`${renderOrderItemsString()}`)}
                {renderItem(`${order.address}`)}
                {renderItem(`${order.phone}`)}
                {renderItem(`${order.status.value}`)}
                {renderItem(`${order.totalPrice / 100} UAH`)}
                {renderCancelButton()}
            </div>
            {renderFullOrder()}
        </div>
    );
};
