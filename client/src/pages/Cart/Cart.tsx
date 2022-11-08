import React from 'react';
import { CloseButton } from '../../components/CloseButton/CloseButton';
import { OrderedProductCard } from '../../components/OrderedProductCard/OrderedProductCard';
import { OrderForm } from '../../components/OrderForm/OrderForm';
import { ToCartQuantityBlock } from '../../components/ToCartQuantityBlock/QuantityCartBlock';
import { TotalPriceBlock } from '../../components/TotalPriceBlock/TotalPriceBlock';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { removeProduct } from '../../stateManager/slices/cartSlice';
import styles from './Cart.module.scss';

interface IProps {}

export const Cart: React.FC<IProps> = ({}) => {
    const orderItems = useAppSelector((state) => state.cart.orderItems);
    const dispatch = useAppDispatch();

    const renderRemoveBtn = (orderItem: CreateOrderItemDto) => {
        return (
            <CloseButton
                onClick={() => dispatch(removeProduct(orderItem.product.id))}
            />
        );
    };

    const renderProductsFromCart = () => {
        if (orderItems.length === 0) {
            return null;
        }

        return orderItems.map((orderItem) => (
            <OrderedProductCard
                key={orderItem.product.id}
                orderItem={orderItem}
                closeButton={renderRemoveBtn(orderItem)}
                quantity={<ToCartQuantityBlock orderItem={orderItem} />}
            />
        ));
    };

    return (
        <div className={styles.container}>
            <div className={styles.orderForm}>
                <h3 className={styles.title}>Checkout order</h3>
                <OrderForm />
            </div>
            <div className={styles.products}>
                <h3 className={styles.title}>Your order</h3>
                <div className={styles.productList}>
                    {renderProductsFromCart()}
                    <TotalPriceBlock orderItems={orderItems} />
                </div>
            </div>
        </div>
    );
};
