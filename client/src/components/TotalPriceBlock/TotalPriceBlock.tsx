import React from 'react';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import { PriceBlock } from '../PriceBlock/PriceBlock';

interface IProps {
    orderItems: CreateOrderItemDto[];
}

export const TotalPriceBlock: React.FC<IProps> = ({ orderItems }) => {
    const totalPrice = orderItems.reduce(
        (acc, orderItem) => acc + orderItem.product.price * orderItem.quantity,
        0,
    );

    return <PriceBlock price={totalPrice} textBefore='Total price: ' />;
};
