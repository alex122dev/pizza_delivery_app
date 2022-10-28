import React from 'react'
import { OrderForm } from '../../components/OrderForm/OrderForm';
import styles from './Cart.module.scss';

interface IProps {

}

export const Cart: React.FC<IProps> = ({ }) => {

    return (
        <div className={styles.container}>
            <div className={styles.orderForm}>
                <h3>Checkout order</h3>
                <OrderForm />
            </div>
            <div className={styles.products}>
                <h3>Your order</h3>
            </div>
        </div>
    )
}
