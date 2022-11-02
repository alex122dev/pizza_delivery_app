import React, { useEffect, useState } from 'react';
import { CustomButton } from '../../components/common/CustomButton/CustomButton';
import { ModalWindow } from '../../components/common/ModalWindow/ModalWindow';
import { OrderCard } from '../../components/OrderCard/OrderCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentUserOrders } from '../../stateManager/actionCreators/orders';
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

    const renderColumnName = (text: string) => {
        return (
            <div>
                <div className={styles.nameItem}>{text}</div>
            </div>
        );
    };

    const renderNamesBlock = () => {
        return (
            <div className={styles.namesBlock}>
                {renderColumnName('id')}
                {renderColumnName('order items')}
                {renderColumnName('address')}
                {renderColumnName('phone')}
                {renderColumnName('status')}
                {renderColumnName('total price')}
            </div>
        );
    };

    const renderOrdersList = () => {
        return (
            <div className={styles.ordersList}>
                {renderNamesBlock()}
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
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
