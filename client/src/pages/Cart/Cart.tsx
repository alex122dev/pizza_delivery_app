import React from 'react'
import { OrderedProductCard } from '../../components/OrderedProductCard/OrderedProductCard';
import { OrderForm } from '../../components/OrderForm/OrderForm';
import { useAppSelector } from '../../hooks/redux';
import styles from './Cart.module.scss';

interface IProps {

}

export const Cart: React.FC<IProps> = ({ }) => {
    const orderItems = useAppSelector(state => state.cart.orderItems)

    const renderProductsFromCart = () => {
        if (orderItems.length === 0) { return null }

        return orderItems.map(orderItem => <OrderedProductCard key={orderItem.product.id} orderItem={orderItem} />)
    }

    const renderTotalPrice = () => {
        const totalPrice = orderItems.reduce((acc, orderItem) => acc + (orderItem.product.price * orderItem.count), 0)

        return <div className={styles.totalPrice}><span className={styles.price}>Total price: {totalPrice / 100}</span><span className={styles.currency}>UAH</span></div>
    }

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
                    {renderTotalPrice()}
                </div>
            </div>
        </div>
    )
}
