import React, { useEffect } from 'react';
import { AdminOrderEditWindow } from '../../components/AdminOrderEditWindow/AdminOrderEditWindow';
import { CustomButton } from '../../components/common/CustomButton/CustomButton';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { OrderPropertyNames } from '../../components/OrderPropertyNames/OrderPropertyNames';
import { OrderDto } from '../../dtos/orders/Order.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllOrders } from '../../stateManager/actionCreators/orders';
import {
    addToEditingOrders,
    removeFromEditingOrders,
} from '../../stateManager/slices/ordersSlice';
import styles from './AllOrders.module.scss';

interface IProps {}

export const AllOrders: React.FC<IProps> = ({}) => {
    const dispatch = useAppDispatch();
    const allOrders = useAppSelector((state) => state.orders.allOrders);
    const editingOrders = useAppSelector((state) => state.orders.editingOrders);

    useEffect(() => {
        dispatch(getAllOrders());
    }, []);

    const renderEditButton = (order: OrderDto) => {
        return editingOrders.some((id) => id === order.id) ? (
            <CustomButton
                startColor='red'
                className={styles.editBtn}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(removeFromEditingOrders(order.id));
                }}
            >
                Cancel
            </CustomButton>
        ) : (
            <CustomButton
                startColor='blue'
                onClick={(e) => dispatch(addToEditingOrders(order.id))}
            >
                Edit
            </CustomButton>
        );
    };

    const renderEditForm = (order: OrderDto) => {
        if (!editingOrders.some((id) => id === order.id)) {
            return null;
        }

        return <AdminOrderEditWindow order={order} />;
    };

    const renderOrdersList = () => {
        return (
            <div className={styles.ordersList}>
                {<OrderPropertyNames />}
                {allOrders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        button={renderEditButton(order)}
                        editingOrderElement={renderEditForm(order)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>All customer orders</h2>
            {renderOrdersList()}
        </div>
    );
};
