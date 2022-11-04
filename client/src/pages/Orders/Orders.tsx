import React, { useEffect, useState } from 'react';
import { CustomButton } from '../../components/common/CustomButton/CustomButton';
import { ModalWindow } from '../../components/common/ModalWindow/ModalWindow';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { OrderPropertyNames } from '../../components/OrderPropertyNames/OrderPropertyNames';
import { OrderDto } from '../../dtos/orders/Order.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
    cancelOrder,
    getCurrentUserOrders,
} from '../../stateManager/actionCreators/orders';
import { setCancelError } from '../../stateManager/slices/ordersSlice';
import styles from './Orders.module.scss';

interface IProps {}

export const Orders: React.FC<IProps> = ({}) => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector((state) => state.orders.orders);
    const [isModalActive, setIsModalActive] = useState(false);
    const cancelError = useAppSelector((state) => state.orders.cancelError);

    useEffect(() => {
        dispatch(getCurrentUserOrders());
    }, []);

    useEffect(() => {
        if (cancelError) {
            setIsModalActive(true);
        }
    }, [cancelError]);

    const renderCancelButton = (order: OrderDto) => {
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

    const renderOrdersList = () => {
        return (
            <div className={styles.ordersList}>
                {<OrderPropertyNames />}
                {orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        button={renderCancelButton(order)}
                    />
                ))}
            </div>
        );
    };

    const closeModalButton = () => {
        return (
            <CustomButton
                startColor='green'
                onClick={(e) => {
                    dispatch(setCancelError(''));
                    dispatch(getCurrentUserOrders());
                    setIsModalActive(false);
                }}
            >
                Ok
            </CustomButton>
        );
    };

    const renderModalError = () => {
        return (
            <ModalWindow
                isActive={isModalActive}
                setIsActive={setIsModalActive}
            >
                <div className={styles.modalBody}>
                    <h2 className={styles.errorTitle}>{cancelError}</h2>
                    {closeModalButton()}
                </div>
            </ModalWindow>
        );
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Orders</h2>
            {renderOrdersList()}
            {renderModalError()}
        </div>
    );
};
