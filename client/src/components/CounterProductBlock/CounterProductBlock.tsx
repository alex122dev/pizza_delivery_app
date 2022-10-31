import React from 'react'
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto'
import { useAppDispatch } from '../../hooks/redux';
import { decrementCount, incrementCount } from '../../stateManager/slices/cartSlice';
import styles from './CounterProductBlock.module.scss';

interface IProps {
    orderItem: CreateOrderItemDto
}

export const CounterProductBlock: React.FC<IProps> = ({ orderItem }) => {
    const dispatch = useAppDispatch()

    return <div className={styles.countBlock}>
        <button className={[styles.countBtn, styles.decrementBtn].join(' ')}
            onClick={(e) => {
                e.preventDefault()
                dispatch(decrementCount(orderItem.product.id))
            }} />
        <span className={styles.count}>{orderItem.count}</span>
        <button className={[styles.countBtn, styles.incrementBtn].join(' ')}
            onClick={(e) => {
                e.preventDefault()
                dispatch(incrementCount(orderItem.product.id))
            }
            } />
    </div>
}
