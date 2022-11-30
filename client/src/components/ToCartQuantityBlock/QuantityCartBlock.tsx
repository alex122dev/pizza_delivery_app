import React from 'react';
import { CreateOrderItemDto } from '../../dtos/orders/CreateOrderItem.dto';
import { useAppDispatch } from '../../hooks/redux';
import {
  decrementQuantity,
  incrementQuantity,
} from '../../stateManager/slices/cartSlice';
import { QuantityProductBlock } from '../QuantityProductBlock/QuantityProductBlock';

interface IProps {
  orderItem: CreateOrderItemDto;
}

export const ToCartQuantityBlock: React.FC<IProps> = ({ orderItem }) => {
  const dispatch = useAppDispatch();

  const decrementFunction = (orderItem: CreateOrderItemDto) =>
    dispatch(decrementQuantity(orderItem.product.id));
  const incementFunction = (orderItem: CreateOrderItemDto) =>
    dispatch(incrementQuantity(orderItem.product.id));

  return (
    <QuantityProductBlock
      orderItem={orderItem}
      decrementQuantity={decrementFunction}
      incrementQuantity={incementFunction}
    />
  );
};
