import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { OrderDto } from '../../dtos/orders/Order.dto';
import { FullOrderInfo } from '../FullOrderInfo/FullOrderInfo';
import styles from './OrderCard.module.scss';

interface IProps {
  order: OrderDto;
  button?: JSX.Element | null;
  editingOrderElement?: JSX.Element | null;
}

export const OrderCard: React.FC<IProps> = ({
  order,
  button,
  editingOrderElement,
}) => {
  const [isActiveOrder, setIsActiveOrder] = useState(false);

  useEffect(() => {
    if (!editingOrderElement) {
      setIsActiveOrder(false);
    } else if (editingOrderElement) {
      setIsActiveOrder(true);
    }
  }, [editingOrderElement]);

  const renderOrderItemsString = () => {
    return order.orderItems
      .reduce(
        (acc, orderItem) =>
          acc + orderItem.product.name + ': ' + orderItem.quantity + ', ',
        '',
      )
      .slice(0, -2);
  };

  const renderOrderProperty = (text: string) => {
    return <div className={styles.orderProperty}>{text}</div>;
  };

  const renderFullOrder = () => {
    if (!isActiveOrder || editingOrderElement) {
      return null;
    }

    return <FullOrderInfo order={order} />;
  };

  return (
    <div className={cn(styles.container, { [styles.active]: isActiveOrder })}>
      <div
        className={cn(styles.body, { [styles.active]: isActiveOrder })}
        onClick={(e) => setIsActiveOrder(!isActiveOrder)}
      >
        {renderOrderProperty(`${order.id}`)}
        {renderOrderProperty(`${renderOrderItemsString()}`)}
        {renderOrderProperty(`${order.address}`)}
        {renderOrderProperty(`${order.phone}`)}
        {renderOrderProperty(`${order.status.value}`)}
        {renderOrderProperty(`${order.totalPrice / 100} UAH`)}
        {button}
      </div>
      {renderFullOrder()}
      {editingOrderElement}
    </div>
  );
};
